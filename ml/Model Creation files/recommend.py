# Apriori

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from apyori import apriori
import pickle
import copy
# Data Preprocessing
dataset = pd.read_csv('Reach out.csv')


interests = [dataset["Interests"][i].split(";") for i in range(dataset.shape[0])]

# Training Apriori on the dataset
rules = apriori(interests, min_support = 0.08, min_confidence = 0.2, min_lift = 3)

# Visualising the results
results = list(rules)

out = []
for i in results:
    rule = {"Frequent Set":list(i[0]),
            "Support":i[1],
            "Antecedent":sorted(list(i[2][0][0])),
            "Consequent":sorted(list(i[2][0][1])),
            "Confident":i[2][0][2],
            "Lift":i[2][0][3]}
    out.append(rule)

association_rules = pd.DataFrame(out)

dict(association_rules)

with open("Asociation_rules.pkl","wb") as file:
    pickle.dump(sam,file)

