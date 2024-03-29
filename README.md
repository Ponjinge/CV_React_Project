﻿# ProjetWeb
___
___
## Notre équipe :

- Gabriel SAUNDERS
- Tristan REBEYROL 
___
## Notre projet :

Notre projet consiste à créer une application web permettant de visualiser les éléments de CV des enseignants chercheurs de l'IRIT et de les permettre à générer des nouveaux CVs en fonction de leurs besoins pour faire leurs demandes de funding. 
___
###  Procédure: 
 
Commencer par la gestion des donnees (garder caractere generique,regarder CV enseignant chercheur info ) (valider enseignant)
Identifier les fonctionnalites de notre application et les prioriser, puis les use cases quon veut faire (valider par enseignant)
- extraction de donnees
- traitement de donnees 
___
## Eléments recurrents des CVs

#### Pseudo-définition des données



```
Personal Information ->  div
Nom (VARCHAR)
Prénom (VARCHAR)
Date de naissance (Date)
Mail (VARCHAR)
Téléphone (INTEGER)
Adresse (VARCHAR)
Age (INTEGER)
Nationalité (VARCHAR)

Summary of Qualifications -> div
List :
Date (Date) - Titre (VARCHAR)  - Adresse (VARCHAR)

Education -> div
List :
Date (Date) - Major ou field (VARCHAR) - Institution (VARCHAR) - Thèse (si il y a en VARCHAR) - Superviseur (VARCHAR) - Financements (VARCHAR)

Experience -> div 
List :
Date (Date) - Teaching,Research etc (VARCHAR) - Institution (VARCHAR) - Description (VARCHAR)

Publication / Presentation -> div
List :
Nom de la publication (VARCHAR)
Lien (optionnel)

```
##### Source:

[Dokumen.tips](https://dokumen.tips/documents/cv-taches-administratives-iritfr-informatique-et-telecommunications-parcours.html?page=2)

[Irit](https://www.irit.fr/~David.Panzoli/)


![table](./img/cv_table.png)
![listS](./img/cv_list.png)

___
#### CV en Anglais
Nom, prénom, photo(si donnée)
Date de naissance
Adresse mail
URL Site web (lien)
Identifiant chercheur (lien)
Mots clé concernant postes
Postes actuels (date → poste → lieu etc)
Anciens postes (date → poste → lieu etc)
Résumé des publications (nom + possibilité de mettre un lien)
Invention(s) (date → nom)
Conférences etc (date → nom)
Prix et nominations (date → nom → infos complémentaires)
Supervision des étudiants des cycles supérieurs et des stagiaires postdoctoraux
(nom → poste → date → sujet → financement → superviseurs)
Organisation d’évènements internationaux (date → nom → avec qui)
Analyste de revue (date → nom)

Membre du comité de programme (date → nom)
Principaux contrats de recherche
(nom → précisions → sponsor → montant → période → implication)
Activités pédagogiques (date → listes d’activités)
Responsabilités institutionnelles ( date → nom etc)
Éducation (date → liste métiers)
Langues
Compétences
Intérêts


### Template Mongo CV:
```
db.CVs.insert( {"Personal Information" : {"name":"<>", "surname":"<>", "dateBirth":"<>", "Mail":"<>", "Telephone":"<>", "Adresse":"<>", "Age":"<>", "Nationality":"<>"}, "Qualifications":[{"Date":"<>","Titre":"<>","Institute":"<>"}], "Education":[{"Institution":"<>", "Field":"<>", "Date":"<>", "Thesis":"<>", "Supervisor":[{"Name":"<>","Title":"<>"},{"Name":"<>","Title":"<>"}],"Funding":"<>"}, {"Institution":"<>", "Country":"<>", "Date":"<>", "Field":"<>"}], "Experience":[{"Date":"<>","Work":"<>","Institution":"<>","Description":"<>"}],"Publications":[{"NamePub":"<>","Date":"<>"}],"Professional Affiliations":[{"<>":"<>"}],"Honors/Awards/Grants":[{"<>":"<>"}]})
``` 
