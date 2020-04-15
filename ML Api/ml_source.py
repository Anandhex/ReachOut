from flask import Flask,request,jsonify
import pandas
import numpy as np
import pickle
from sklearn.cluster import KMeans
import json,re

app = Flask(__name__)

PS = pickle.load(open('portStem.pkl', 'rb'))
CV = pickle.load(open('Countvec.pkl','rb'))
model = pickle.load(open('Gaussclass.pkl','rb'))
with open("stopwords.json","r") as file:
    stop_words = json.load(file)["words"]

cluster_model = None
with open("clustering_with_age.pkl","rb") as file:
    cluster_model = pickle.load(file)

cluster_top_interests = None
with open("top_interests_by_clusters.pkl","rb") as file:
    cluster_top_interests = pickle.load(file)

male_interests = None
with open("male_top_interests.pkl","rb") as file:
    male_interests = pickle.load(file)

female_interests = None
with open("female_top_interests.pkl","rb") as file:
    female_interests = pickle.load(file)

interest_id_dict = None
with open("interest_id_dict.pkl","rb") as file:
    interest_id_dict = pickle.load(file)

def get_interests(age,gender):
    cluster = (cluster_model.predict(np.array(age))[0])
    cluster_interests = cluster_top_interests[cluster]
    interests = list()
    if gender.lower() == "male":
        interests = list(set(cluster_interests) & set(male_interests))
    if gender.lower() == "female":
        interests = list(set(cluster_interests) & set(female_interests))


    output = {}
    output["Cluster"] = int(cluster)
    if len(interests)!=0:
        output["Final Interests"] = interests
    else:
        output["Final Interests"] = cluster_interests

    interest_id = list(map(lambda x:interest_id_dict[x],output["Final Interests"]))
    output["Interests Ids"] = interest_id
    output["Interests-Id"] = interest_id_dict
    return jsonify(output)

def nlp_preprocessing(comment):

    senti = {0:"Negative",1:"Positive"}

    review = re.sub('[^a-zA-Z]', ' ' ,comment)
    review = review.lower()
    review = review.split()
    review = [PS.stem(word) for word in review if not word in set(stop_words)]
    review = " ".join(review)

    corpus = [review]
    x=CV.fit_transform(corpus).toarray()
    pred = model.predict(x)

    output = senti[pred[0]]
    return output


@app.route('/',methods = ["GET","POST"])
def home():
    return "Api is working"

@app.route('/suggest-category',methods = ["GET","POST"])
def predict_category():
    age = int(request.args.get("age"))
    gender = request.args.get("gender")
    return get_interests(age,gender)

@app.route('/predict-sentiment',methods=['GET','POST'])
def predict_sentiment():
    '''
    For rendering results on HTML GUI
    '''
    comment = request.args.get('comment')

    sentiment = nlp_preprocessing(comment)

    return jsonify({"Sentiment":sentiment})

@app.route('/recommend-interest',methods = ["GET","POST"])
def predict_interest():
    return "api interests working"

if __name__ == "__main__":
    app.run(debug=True)