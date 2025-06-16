import csv
import re
from datetime import datetime

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("sante-66741-firebase-adminsdk-fbsvc-d86a35307d.json")  # ← Replace with your JSON path
firebase_admin.initialize_app(cred)
db = firestore.client()

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


def extract_response_info(text):
    match = re.search(r'\b([A-C])[^a-zA-Z0-9]*\s+(.*)', text)
    if match:
        letter = match.group(1).upper()
        rest = match.group(2).strip().capitalize()
        number = {"A": 0, "B": 1, "C": 2}[letter]
        return rest, number
    return text, None

def parse_quizz_title_date(input_str):
    match = re.match(r"(.+?)\s*\[(\d{2}/\d{2}/\d{4})\s*-\s*(\d{2}/\d{2}/\d{4})\]", input_str)
    if not match:
        return None, None, None
    
    title = match.group(1).strip()
    start_date = datetime.strptime(match.group(2), "%d/%m/%Y")
    stop_date = datetime.strptime(match.group(3), "%d/%m/%Y")
    
    return title, start_date, stop_date

csv_file_path = 'db.csv'
nb_quizz = 5

final_data = {}


for x in range(nb_quizz):
    questions = []
    question = {}
    answears = []
    correct = 0
    q_tilte = ""
    q_start = ""
    q_stop = ""
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        i = 0
        quizz_row_number = 0
        for row in reader:
            i+= 1
            j = 0
            if i < 3:
                if i == 1:
                    q_title, q_start, q_stop = parse_quizz_title_date(row[1+(x*2)])
                continue
            quizz_row_number += 1

            for column in range(1+(x*2), 3+(x*2)):
                j += 1 # j is 1 or 2
                 # quizz_row_number is 1, 2, 3 or 4
                if j == 1:
                    if quizz_row_number == 1:
                        question["text"] = row[column]
                    else:
                        answears.append({
                            "text": row[column],
                            "correct": False
                        })
                else:
                    if row[column] != "":
                        tmp = extract_response_info(row[column])
                        question["help"] = tmp[0]
                        correct = tmp[1]
                          
            if quizz_row_number == 4:
                quizz_row_number = 0
                answears[correct]["correct"] = True
                correct = 0
                question["answers"] = answears
                questions.append(question)
                #print(question)
                #print("Done")
                question = {}
                answears = []           
                
        final_data[f'quizz{x+1}'] = {
            "name": q_title,
            "start": q_start,
            "stop": q_stop,
            "questions": questions
        }
        print(f'quizz{x+1} done')
        #print(questions)
            
    
print("All quizz done")
print(final_data)

doc_ref = db.collection("public").document("quizzdata")
doc_ref.set({"quizzdata":final_data, "pictos": pictos()})
