import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Init Firebase
cred = credentials.Certificate("sante-66741-firebase-adminsdk-fbsvc-d86a35307d.json")  # ← Replace with your JSON path
firebase_admin.initialize_app(cred)
db = firestore.client()

start_time = datetime(2025, 6, 5, 8, 0, 0)  # 10 June 2025, 08:00
stop_time = datetime(2025, 6, 10, 9, 0, 0)   # 10 June 2025, 09:00

def classement(i):
        # player username and player score, make a list that will be sorted by score
    tmp = {}
    for x in range(1, i):
        tmp["player"+str(x)] = 60 + x * 2
        
    return tmp
    
def pictos():
    ret = {
        "0" : {
            'id': 0,
            "name": "picto1",
            "text": "Le sexe c'est cool. Protégé.e, c'est mieux !",
            "question": "T'es pas cap de venir chercher des capotes pour tout ton kot à univers santé ?",
            "picture": "picture1"
        },
        "1" : {
            "id": 1,
            "name": "picto2",
            "text": "Pour guindailler avec dignité, reste hydraté.e !",
            "question": "Fais un pierre-papier-ciseau à chaque fois que tu te sers : si tu perds, tu bois un verre d'eau à la place !",
            "picture": "picture2"
        },
        "2" : {
            "id": 2,
            "name": "picto3",
            "text": "Rentrer accompagné.e, c'est plus safe ",
            "question": "Explique ton itinéraire pour rentrer à la maison. Si c'est flou, t'as pas le volant. Appelle un pote, un taxi, ou reste dormir !",
            "picture": "picture3"
        },
        "3" : {
            "id": 3,
            "name": "picto4",
            "text": "Pour tes voisins, décale en surface !",
            "question": "Ce soir au kot c'est roi du silence, le premier qui parle sort de la pièce pendant 10 min OU sert l'eau à tout moment pour qui veut",
            "picture": "picture4"
        },
        "4" : {
            "id": 4,
            "name": "picto5",
            "text": "Si tu jettes, tu ramasses !",
            "question": "Avant de changer de pièce ou de rentrer, chacun nettoie son coin. Laisse pas ta soirée dans un sale état ! Ramasse plus de déchets que tes camarades",
            "picture": "picture5"
        },
        "5" : {
            "id": 5,
            "name": "picto6",
            "text": "Tes besoins, c'est au petit coin !",
            "question": "Avant d'ouvrir une nouvelle bière, chaque participant doit s'assurer d'avoir visité les toilettes. Sinon, la prochaine tournée est suspendue !",
            "picture": "picture6"
        },
        "6" : {
            "id": 6,
            "name": "picto7",
            "text": "Le consentement, c'est sexy. L'insistance, non !",
            "question": "Pendant 10 minutes, chacun doit garder une distance équivalente à la longueur d'un bras par rapport aux autres.",
            "picture": "picture7"
        },
        "7" : {
            "id": 7,
            "name": "picto8",
            "text": "Tu hésites ? Ralentis !",
            "question": "Tente de tenir sur une jambe 10 secondes sans vaciller. Si tu tombes, c'est peut-être le moment de passer à l'eau !",
            "picture": "picture8"
        },
        "8" : {
            "id": 8,
            "name": "picto9",
            "text": "Arrête-toi avant le verre de trop",
            "question": "À la fin de la soirée, dis ce que t'as bu (quoi et combien). Tu te souviens ? Bien joué. Tu sais pas ? Allez, prochaine fois on note !",
            "picture": "picture9"
        },
        "9" : {
            "id": 9,
            "name": "picto10",
            "text": "Boire ou conduire, il faut choisir",
            "question": "Toutes les clés de voiture dans un bol. Fin de soirée : on devine à qui elles sont… mais personne les prend s'il a bu. Personne.",
            "picture": "picture10"
        }
    }
    return ret

# Define quiz content

def quiz_1(i):
    ret = {
        "name": "Prévention alcool",
        "start": start_time,
        "stop": stop_time,
        "questions": [
            {
                "text": "Quizz"+str(i+1)+" q.1 faire pour cuver son alcool ?",
                "help": "Il n'y a pas de remède miracle pour éliminer l'alcool du corps. Le temps est le seul moyen efficace.",
                "answers": [
                    { "text": "Boire un café bien serré.", "correct": False },
                    { "text": "Prendre "+str(i)+" une douche froide.", "correct": False },
                    { "text": "Attendre et laisser le corps éliminer l'alcool.", "correct": True }
                ]
            },
            {
                "text": "Quizz"+str(i+1)+" q.2 faire pour cuver son alcool ?",
                "help": "Il n'y a pas de remède miracle pour éliminer l'alcool du corps. Le temps est le seul moyen efficace.",
                "answers": [
                    { "text": "Boire un thé bien serré.", "correct": False },
                    { "text": "Prendre "+str(i)+" une douche froide.", "correct": False },
                    { "text": "Attendre et laisser le corps éliminer l'alcool.", "correct": True }
                ]
            },
            {
                "text": "Quizz"+str(i+1)+" q.3 faire pour cuver son alcool ?",
                "help": "Il n'y a pas de remède miracle pour éliminer l'alcool du corps. Le temps est le seul moyen efficace.",
                "answers": [
                    { "text": "Boire une soupe bien serré.", "correct": False },
                    { "text": "Prendre "+str(i)+" une douche froide.", "correct": False },
                    { "text": "Attendre et laisser le corps éliminer l'alcool.", "correct": True }
                ]
            }
        ]
    }
    return ret

quiz_data = {
    "quizz1": quiz_1(1),
    "quizz2": quiz_1(2),
    "quizz3": quiz_1(3),
}

# Upload to Firestore in `quizzs` collection
doc_ref = db.collection("public").document("quizzdata")
doc_ref.set({"quizzdata":quiz_data, "classement": classement(30), "pictos": pictos()})

print("Quiz uploaded successfully.")
