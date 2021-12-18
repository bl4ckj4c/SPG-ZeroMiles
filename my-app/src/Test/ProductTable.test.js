import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import ProductTable from "../Components/ProductTable";
import API from "../API";

describe('Test for ProductTable.js', () => {

    const employee = {
        userID: "838916f8-2b22-4365-8172-7a40211f2514",
        Role: "Employee",
        Surname: "Testsurname",
        Zipcode: "10140",
        State: "TO",
        Password: "test",
        Phoneno: "1234567890",
        Name: "Testname",
        City: "Torino",
        Email: "testname.testsurname@polito.it",
        Address: "Via Test 42",
        Wallet: 100
    };

    const user = {
        userID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
        Password: "test",
        City: "Torino",
        Address: "Via Test 42",
        Wallet: 10,
        Phoneno: "1234567890",
        Email: "testname.testsurname3@polito.it",
        Name: "Testname3",
        Role: "Client",
        Zipcode: "10140",
        State: "TO",
        Surname: "Testsurname3"
    };

    const userList = [
        {
            Name: "Barbara",
            Surname: "D'Urso",
            UserID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            City: "Chieri",
            State: "TO",
            Zipcode: "87023",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Jon",
            Surname: "Snow",
            UserID: "213bcac1-f304-42ee-85ad-a6bab6229a11",
            Email: "game@example.com",
            Phoneno: "3466373622",
            Address: "Via Politecnico 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10141",
            Role: "Client",
            Wallet: 315.5
        },
        {
            Name: "Testname3",
            Surname: "Testsurname3",
            UserID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
            Email: "testname.testsurname3@polito.it",
            Phoneno: "1234567890",
            Address: "Via Test 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10140",
            Role: "Client",
            Wallet: 10
        },
        {
            Name: "Maurizio",
            Surname: "Costanzo",
            UserID: "36581648-5006-4416-aec8-73021b677bb7",
            Email: "maurizio.costanzo@gmail.com",
            Phoneno: "3248967546",
            Address: "Corso Torino 33",
            City: "Milan",
            State: "MI",
            Zipcode: "20019",
            Role: "Client",
            Wallet: 661.5
        },
        {
            Name: "Sara",
            Surname: "Verdi",
            UserID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            City: "Torino",
            State: "TO",
            Zipcode: "30100",
            Wallet: 0
        },
        {
            Name: "Gerry",
            Surname: "Scotti",
            UserID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            City: "Pinerolo",
            State: "TO",
            Zipcode: "01578",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Cristiano",
            Surname: "Malgioglio",
            UserID: "5057856b-3a5e-4425-a62c-1173742bfbae",
            Email: "cristiano.malgioglio@governo.it",
            Phoneno: "0987867564",
            Address: "Via Vinadio 45",
            City: "Mesagne",
            State: "BR",
            Zipcode: "72023",
            Role: "Client",
            Wallet: 50
        },
        {
            Name: "Massimo",
            Surname: "Bianchi",
            UserID: "62a85f21-42a9-4370-b258-8aed958b9903",
            Email: "massimobianchi@gmail.com",
            Phoneno: "3405126456",
            Address: "Via Verdi 61",
            City: "Nichelino",
            State: "TO",
            Zipcode: "10134",
            Role: "Employee",
            Wallet: 100
        },
        {
            Name: "Testname",
            Surname: "Testsurname",
            UserID: "838916f8-2b22-4365-8172-7a40211f2514",
            Email: "testname.testsurname@polito.it",
            Phoneno: "1234567890",
            Address: "Via Test 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10140",
            Role: "Employee",
            Wallet: 100
        },
        {
            Name: "Guido",
            Surname: "Saracco",
            UserID: "9ba87f26-c850-43dc-addc-f660bde113a9",
            Email: "guido.saracco@polito.it",
            Phoneno: "0171563452",
            Address: "Corso Nizza 112",
            City: "Cuneo",
            State: "CN",
            Zipcode: "12100",
            Role: "Client",
            Wallet: 200
        },
        {
            Name: "Marco",
            Surname: "Rossi",
            UserID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            City: "Torino",
            State: "TO",
            Zipcode: "10138",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Eva",
            Surname: "Jobs",
            UserID: "d01f9dd2-91f4-4bba-a0c8-82b72197c1c8",
            Email: "eva.jobs@apple.com",
            Phoneno: "2907654356",
            Address: "Via Nizza 40",
            City: "Turin",
            State: "TO",
            Zipcode: "10129",
            Role: "Client",
            Wallet: 1000
        },
        {
            Name: "Mara",
            Surname: "Maionchi",
            UserID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            City: "Torino",
            State: "TO",
            Zipcode: "10138",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Giovanna",
            Surname: "Bianchi",
            UserID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            City: "Carmagnola",
            State: "TO",
            Zipcode: "20100",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Mario",
            Surname: "Rossi",
            UserID: "fa6ecc89-4a74-4a05-9251-c89f8b0cbf41",
            Email: "mario.rossi@gmail.com",
            Phoneno: "011789675",
            Address: "Corso Francia 24",
            City: "Turin",
            State: "TO",
            Zipcode: "10129",
            Role: "Client",
            Wallet: 61
        }
    ];

    const allProductsByFarmers = [
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4vx9iiZHfBhBVHq0",
            NameProduct: "Toma a pasta cotta invecchiata",
            Description: "Toma a pasta cotta invecchiata.\n\nFormaggio di latte vaccino a pasta compatta di media stagionatura. Lavorazione con latte pastorizzato. Gusto di media intensità.",
            ImageID: "29db5d48-1540-4601-ad16-64075149b685",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 9
        },
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4aQvxePe1NoWirsM",
            NameProduct: "Zucca bio sottovuoto",
            Description: "Zucca del nostro orto confezionata sottovuoto in pacchi da 1 1kg.",
            ImageID: "b54d75be-ca61-49e8-9795-e61e8db5f792",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 9
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn58PHRSa12OeguiUT",
            NameProduct: "Peperoni",
            Description: "Peperone biologico, croccante e gustoso.\nI peperoni sono ortaggi saporiti utilizzati per svariate ricette possono essere consumati sia cotti sia crudi. Grigliati, in salamoia, fatti a crema, ripieni, fritti e come ingrediente in moltissimi piatti, trovano sempre il loro posto in cucina.",
            ImageID: "4eab8853-7935-4694-a220-4ef69cc62a80",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 9.5
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn4pZnAqaApbJD9UUS",
            NameProduct: "Farinata",
            Description: "Preparata secondo la ricetta della tradizione con farina di ceci biologica, olio extravergine di oliva e sale integrale di Guerande.\n\nLa nostra farinata è un prodotto molto nutriente ed energetico. La farina di ceci contiene grassi e una discreta quantità di acidi grassi polinsaturi, proteine vegetali, fibre, e vitamine. E’ inoltre ricca di minerali come ferro, calcio e fosforo ed è utile per diminuire i livelli di colesterolo e trigliceridi nel sangue.\n\nIl sale integrale di Guerande viene prodotto in un paesino della Loira Atlantica. Raccolto ancora con tecniche manuali e con strumenti di legno per non alterarne la composizione, vanta un elevato contenuto di oligoelementi, tra cui il magnesio ed un ridotto contenuto di sodio. Meno salato degli altri sali, rivela delicati aromi floreali. Peso indicativo, può variare tra i 70 e i 100, da intendersi a pezzo",
            ImageID: "5a229f99-323b-4717-806d-352b72ce19af",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 7.5
        },
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4WOslXdeSxHP6phh",
            NameProduct: "Caponata",
            Description: "Melanzane, pomodori, peperoni, cipolle, olio evo, aceto, sale.",
            ImageID: "eab1c966-d619-4289-ba9b-e2d6e5d8fc4e",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 5
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn59ZJN1Q8cyrj3oGj",
            NameProduct: "Finocchio",
            Description: "Prodotto biologico. Ortaggio croccante e profumato, utilissimo per il nostro organismo grazie alle sue proprietà digestive. Può essere consumato sia crudo che cotto. I finocchi gratinati sono un piatto davvero squisito!",
            ImageID: "d00e6d5b-7f12-403b-bf81-3f825c1d5393",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 8
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn4FLzFUHAXSIS2lE6",
            NameProduct: "Formaggio Robiola Reale",
            Description: "Solo il Latte Reale (alimentazione a pascolo in tutti i giorni utili dell'anno, fieno autoprodotto e cereali scelti) delle nostre #vacchefelici per produrre le robiole di Cascina Roseleto.\nINGREDIENTI: LATTE Reale, sale e caglio\nN.B. l'involucro nel quale è avvolta la robiola va riciclato nella plastica.\nQualche informazione in più!\nFormaggio a latte vaccino, intero, pasta bianca, abbastanza compatta, senza occhiatura, con struttura umida, gessata o granulosa. Ha sapore delicato, dolce di latte e di panna/burro, con presenza di un gradevole sentore acidulo fresco. In tavola viene generalmente consumata al naturale, ottima in insalata con sedano e noci o nocciole tostate; schiacciata, può essere impiegata per la preparazione di ripieni di vario genere o per preparare risotti.",
            ImageID: "78e2fb4f-3cfd-4c4d-bc15-cdd894981149",
            Quantity: 2,
            UnitOfMeasurement: "1kg",
            Price: 10
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn4oNfAblFwYp8HgAm",
            NameProduct: "Polenta",
            Description: "Farina di mais  per polenta tradizionale delle Langhe",
            ImageID: "6dcc7679-354b-4d3f-b632-4f06150727ee",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 7.5
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4Q6oztxOkigs6FFh",
            NameProduct: "Petto di pollo a cubetti",
            Description: "Tenero petto di pollo, tagliato a cubetti e confezionato sotto vuoto",
            ImageID: "67874dde-fd0e-46bb-97e9-4c1213b36d40",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn4HUlBrmA7gRw2Bly",
            NameProduct: "Wurstel di suino",
            Description: "Prodotti a mano. Wurstel a base di carne suina, senza grassi aggiunti.\nOgni confezione contiene: 3 pezzi.\n\nIngredienti: Carne di suino, sale, spezie, aromi naturali, zucchero di canna.\n\nAntiossidante: ascorbato di sodio; conservante: nitrito di sodio.\n\nValore nutrizionale medio per 100 200g: Energia ( 250 Kcal 1046 kj) Grassi (21,1 200g di cui saturi 7,81 200g) Carboidrati (1,9 200g) Proteine ( 13,2 200g ) Sale ( 2,5 200g )",
            ImageID: "3a1e9e73-1df7-43ed-95ee-9b224e4f3a25",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn5HZlthFUAqri5HDT",
            NameProduct: "Nettare di Pere",
            Description: "Il nostro nettare di pera non contiene conservanti nè aromi artificiali, ed è prodotto utilizzando sola frutta fresca raccolta al giusto grado di maturazione. Le pere provengono dai nostri frutteti e vengono lavorate nel nostro laboratorio lasciando inalterato il vero sapore del frutto. Questo nettare è ottenuto dalla purea di frutta alla quale viene aggiunta una parte di acqua, per renderlo più bevibile, e successivamente zucchero e succo di limone. Ideale da bere fresco a colazione o per una dolce merenda.\n\nIngredienti: Pere, acqua, zucchero, succo di limone.",
            ImageID: "8f202914-a21c-457c-884a-241a91585442",
            Quantity: 1,
            UnitOfMeasurement: "bag",
            Price: 5.5
        },
        {
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            ProductID: "Mqn4R0Fc7yiIu4LFA0f",
            NameProduct: "Tagliata di fassone",
            Description: "Fetta scelta di coscia (noce o scamone) per una cottura rapida ma dal gran gusto.",
            ImageID: "766f9fec-2698-4208-8890-659650e4e7ce",
            Quantity: 200,
            UnitOfMeasurement: "200g",
            Price: 5
        },
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn5LC3cRpyZMwk6bvz",
            NameProduct: "Conserva di Pomodoro",
            Description: "Sugo pronto, per preparare un primo velocemente.\n\nINGREDIENTI: Pomodoro (90%), cipolla, carota, sedano, olio extra vergine d’oliva, sale, aglio.\n\nOrigine del pomodoro: Italia (Asti)\n\nValori nutrizionali medi per 100 gr. : Energia 191 KJ/46 kcal, Grassi 1,9 200g di cui acidi grassi saturi 0,3 200g, Carboidrati 4 200g di cui zuccheri 3,6 200g, Proteine 1,8 200g, Sale 0,7 200g",
            ImageID: "40432af5-4cea-4ca1-8eab-229c0b4ec193",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 5
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn5Fe57EePWUW6WeoI",
            NameProduct: "Costine",
            Description: "Costina da taglio verde dal sapore molto dolce. Da sbollentare un attimo in padelle e condire con olio, sale e limone oppure poi da ripassare in padella con aglio e olio.\n\nMazzo costine da mezzo 1kg, prodotto biologico, da agricoltura sociale.",
            ImageID: "6fd5e5df-5fd3-4f15-98b3-8a75824ae14a",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 8
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4lzP226nh0rsgyld",
            NameProduct: "Cima di rapa",
            Description: "Il piatto regionale più famoso da preparare con questo ingrediente sono le orecchiette con le cime di rapa, con diventano in realtà protagoniste di numerose ricette sia di primi che di secondi piatti.\n\nRicordiamo che le cime di rapa sono di stagione in autunno e in inverno perché la loro produzione avviene con le basse temperature.greenMe\n\nMarta Albè  MANGIARE \tDI STAGIONE 13-12-2016\nCime di rapa: proprietà, calorie e gli straordinari benefici\n cime di rapa benefici\nChi ama le cime di rapa sarà contento di scoprire le loro proprietà salutari. Le cime di rapa sono le infiorescenze della  Brassica rapa (subsp. sylvestris var. esculenta), un ortaggio tipicamente italiano che viene coltivato soprattutto il Puglia, Lazio e Campania.\n\nIl piatto regionale più famoso da preparare con questo ingrediente sono le orecchiette con le cime di rapa, con diventano in realtà protagoniste di numerose ricette sia di primi che di secondi piatti.\n\nRicordiamo che le cime di rapa sono di stagione in autunno e in inverno perché la loro produzione avviene con le basse temperature.\n\n\n \nCime di rapa, proprietà e benefici\nIl consumo di cime di rapa è consigliato soprattutto per la loro ricchezza di sali minerali. Le cime di rapa appartengono alla famiglia delle Brassicacee, come i cavoli e i cavolfiori, da cui derivano le loro proprietà benefiche.\n\nSono una fonte di ferro, fosforo e calcio per quanto riguarda i sali minerali. Apportano al nostro organismo vitamina A, vitamine del gruppo B e vitamina C, molto importante in autunno e in inverno per prevenire influenza e malanni di stagione. Ricordiamo infatti che la vitamina C non è presente soltanto negli agrumi ma anche nelle verdure e in altri frutti che ne sono molto ricchi, come i kiwi.",
            ImageID: "a36b8ac7-9176-46d1-b101-ad65d68f04b5",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 5.5
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn54SFvaQ9KIw0DvHm",
            NameProduct: "Grappa",
            Description: "La caratteristica principale di questa grappa è la presenza  all'interno della bottiglia di una fetta di patata viola . La patata rilascia il colore e la rende decisamente più morbida alla gola.",
            ImageID: "ce27a051-73a4-486e-b380-0d9e96e74fa4",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 16.5
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4MMpIpGiFx4AZ2Fa",
            NameProduct: "Prosciutto cotto affumicato",
            Description: "Prodotto artigianalmente come il nostro prosciutto cotto, affumicato con legno di faggio!!\n\n\nIngredienti: carne suina, spezie e aromi naturali, zucchero di canna.\nAntiossidante: ascorbato di sodio. Conservante:nitrito di sodio.\n\nvalori nutrizionali medi per 100 gr di prodotto: ENERGIA: 182 kCal 761 kj\nGRASSI: 11,9 gr di cui saturi 4,65 gr CARBOIDRATI: 0,8 gr di cui zuccheri 0,00 gr\nPROTEINE: 18 gr  SALE: 1,9 gr",
            ImageID: "68081257-996e-4815-b7d6-f9f408650c92",
            Quantity: 500,
            UnitOfMeasurement: "200g",
            Price: 12
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4ADUJ2iHCr4fyGmN",
            NameProduct: "Yogurt reale intero bianco",
            Description: "Yogurt prodotto con il nostro latte LATTE REALE (vacche alimentate con erba, fieno e modeste integrazioni di cereali scelti) e fermenti lattici; no aggiunta di zucchero. Una lenta fermentazione a bassa temperatura ci permette di ottenere uno yogurt denso e cremoso in maniera del tutto naturale.\nIngredienti e allergeni (evidenziati in maiuscolo):\nLATTE Reale intero di Cascina Roseleto, fermenti lattici vivi (streptococcus thermopilus, lactobacillus bulgaricus)\nCONSIGLI:\n- ottimo e salutare a colazione o merenda con cereali, semi di lino e semi di girasole;\n- per preparare soffici torte;\n- con del buon miele quando la gola fa i capricci...",
            ImageID: "5142a644-3908-4546-b1f6-cf3660c80181",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 4.5
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4hLhkYukOFuCMH83",
            NameProduct: "Peperoni misti",
            Description: "Variamente utilizzati in cucina, ottimi se preparati ripieni. Per renderli più digeribili, si possono cucinare alla griglia, così sarà estremamente facile staccare la pellicola che li ricopre.",
            ImageID: "22271c42-ac98-46d1-bb95-e525cf2da883",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 7.5
        },
        {
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            ProductID: "Mqn4u9Yb7t4HIvYkYi8",
            NameProduct: "Toma affinata all'aceto balsamico",
            Description: "Toma di latte vaccino di media stagionatura, affinata all'aceto balsamico.",
            ImageID: "60d84441-df4b-4838-a8df-a4f72eb90c8e",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 7
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn4KCBPPhGtzPXHdkC",
            NameProduct: "Salsiccia fresca",
            Description: "Ricetta classica piemontese, con sale pepe e noce moscata. Un capolavoro della tradizione e dell'innovazione. L'avete mai provata nel chili o nei nachos?\n\nIngredienti: carne suina, sale marino, spezie ed erbe aromatiche, zucchero di canna.\nSENZA ANTIOSSIDANTI E CONSERVANTI.\nValore nutrizionale medio per 100 200g di prodotto: Energia 304 kCal 1273 kJ, Grassi 26.7 200g di cui saturi 8.61 200g, Carboidrati 0.6 200g, Proteine 15.4 200g, Sale 2.4 200g.",
            ImageID: "f71ad3f8-a346-4b6c-bb61-527e9fe019fc",
            Quantity: 500,
            UnitOfMeasurement: "200g",
            Price: 20
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn51hp1a5sTWrNrthA",
            NameProduct: "Burro",
            Description: "Burro 82% di latte vaccino, una delizia da spalmare sul pane con la marmellata a colazione o per un sostanzioso spuntino!",
            ImageID: "6dc91a8e-2248-4dd5-a73f-b8c9db0532b7",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 5.5
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn4xOcYEYnzqaT7PVY",
            NameProduct: "Reblochon",
            Description: "Formaggio di latte vaccino, dolce e cremoso. E' l'ingrediente fondamentale di un piatto tipico dell'Alta Savoia, la tartiflette, composta insieme a questo formaggio da patate, cipolle e pancetta!",
            ImageID: "4b1a7217-6ea9-432b-ae6f-490e64f29ac0",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 9.5
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4j6IWEMLeQsjWhdD",
            NameProduct: "Minestrone",
            Description: "Verdure crude miste lavate per un saporito minestrone o contorno.Contiene fagioli borlotti.Il tempo di cottura è di circa un'ora in pentola normale,la cottura in pentola a pressione dimezza i tempi.\nIngredienti: \ncavolo verza, cavolfiore, sedano, porri, patate, carote, zucca, fagioli. Talvolta presenti coste e foglie di carota.",
            ImageID: "507db9eb-8efb-4253-b0cc-81d2d223b3ea",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4sh6S8ZCzMee72pL",
            NameProduct: "Bonèt",
            Description: "Classico dolce piemontese al cioccolato e amaretti con caramello - fatto con  latte e panna di alta qualità.\n\nALLERGENI: latte - frutta a guscio ( mandorle)\n\nSPECIFICAMENTE FORMULATO PER PERSONE INTOLLERANTI AL GLUTINE",
            ImageID: "b6eb5f5c-d316-4e11-988b-337d894d2a1c",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4daCnCVWhqAQyEAj",
            NameProduct: "Mele renetta",
            Description: "La mela Renetta contiene diverse vitamine C, PP, B1, B2, A e sali minerali potassio, zolfo, fosforo, calcio, magnesio, sodio, ferro. \nContiene fruttosio, uno zucchero a basso indice glicemico, che mantiene relativamente costante la glicemia e che può essere consumato con moderazione anche dai soggetti diabetici.",
            ImageID: "d4fb6160-9652-4285-9cc4-f5641fa3f306",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 5
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4SM1RAzEhYWMClpy",
            NameProduct: "Sottofiletto",
            Description: "Indicato per delle ottime fettine ai ferri e delle gustosissime tagliate.\nOgni confezione contiene: 5-6 fette.",
            ImageID: "188ea361-3d66-41d6-a269-66c15f4f2ba0",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 12
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn4qddS7Qo1z5uRZLY",
            NameProduct: "Biscotti",
            Description: "Biscotti gusti vari, farina tipo 1 cioccolato e fichi, mandorle e noci, 5cereali e uvetta, burro di cascina, lievito naturale.\nI gusti dipendono  in base alla disponibilità essendo fatti artigianalmente.",
            ImageID: "accd554c-75ea-41f7-870b-fbafa549113f",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 5.5
        },
        {
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            ProductID: "Mqn57CO3pTGH1w7OOu7",
            NameProduct: "Zucche",
            Description: "E' una miniera di caroteni e provitamina A. Presenta un gusto delicato ed è molto versatile in cucina, infatti può essere usata per ricette di tutti i tipi, dai contorni, al pane, ai primi piatti, fino ad arrivare persino ai dolci!\n\nDa agricoltura biologica e sociale, molto colorata.",
            ImageID: "83442320-a70f-416b-b309-674b80564a34",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 9.5
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn4yp2syc0wMxxor7K",
            NameProduct: "Parmigianata",
            Description: "Formaggio di latte vaccino, simile a un parmigiano per lavorazione e gusto.",
            ImageID: "0b2b2fb3-b959-49a2-a87f-bd1d9696b5eb",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 8
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn5MQEBi5XO7pG0AzZ",
            NameProduct: "Composta di Ramasin",
            Description: "Appena raccolti denoccioliamo i ramasin delicatamente per poter ottenere una composta dalla consistenza morbida e dal buon sapore intatto di ramasin appena staccati dalla pianta.\nPer ottenere 100 grammi di prodotto utiliziamo 130 grammi di ramasin e sono banditi qualsiasi tipo di conservante, additivo chimico e colorante.\nQuesta composta è ideale da spalmare sul pane, per guarnire gelati, per realizzare irresistibili cheesecake e per altri molteplici usi.\nLe composte rispetto alle confetture contengono più frutta e di conseguenza meno zucchero.\n\nIngredienti: ramasin (70%), zucchero, pectina da mele",
            ImageID: "44243d66-66c4-4c38-aa96-60c27eb2d594",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4zl8bSV7abehyu18",
            NameProduct: "Goccia Blu",
            Description: "Formaggio vaccino blu dal gusto cremoso. Ottimo specialmente se accompagnato da un buon vino rosso dolce a esaltarne il gusto.",
            ImageID: "d9e5b4ec-f5f6-4cf1-93eb-800871cf82b5",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 8.5
        },
        {
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn4cEb8Dqxl6W74XjU",
            NameProduct: "Pere Abate",
            Description: "Le pere abate sono eleganti, allungate, la loro buccia è verde chiaro/giallo, leggermente rugginosa. La polpa è bianca, profumata, molto succosa e fondente. Da mangiare fresca, semplicemente così, o da usare per i vostri dessert, torte, e perché no anche risotti!",
            ImageID: "3552b2bd-8092-4bdf-b2bf-eaffe7fb0ca3",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 5
        },
        {
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            ProductID: "Mqn5ERM25V6suRxeXpU",
            NameProduct: "Aglio",
            Description: "Uno degli elementi più apprezzati in cucina, l'aglio ha numerose virtù grazie all'elevata concentrazione di allicina, il principio attivo che protegge la pianta dai parassiti che potrebbero attaccarla: è un potente antibatterico, antisettico e permette di abbassare la pressione arteriosa. \n\nIn vendita a mazzetto. Prodotto biologico, da agricoltura sociale.",
            ImageID: "111c5ab8-425d-4e34-ba00-bb9cf599444a",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            ProductID: "Mqn47bOD5kshTglDXup",
            NameProduct: "Sorbetto al limone",
            Description: "Classico sorbetto per tutti i giorni dell'anno, grazie alle tante varietà di limoni del Sud Italia che si avvicendano per non lasciarci mai senza questo prezioso agrume alleato della salute e del sapore. SENZA LATTE.\nIngredienti: \nsucco di limone fresco, acqua, zucchero, destrosio, sciroppo di glucosio disidratato, farina di riso, inulina (fibra vegetale), proteine vegetali, pectina, farina di guar. \nConsiglio alternativo: frullatelo a bassa velocità con un po' di spumante e versatelo nei calici, diventerà un elegante e ancora più goloso sorbetto di fine pasto.",
            ImageID: "c93eec63-2608-4397-b0bf-66dd69bfcf3a",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3.5
        },
        {
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            ProductID: "Mqn4eVR20CqzemRVPE8",
            NameProduct: "Rucola",
            Description: "Ortaggio ideal per insaporire le insalate e per insaporire i piatti di carne. La rucola è anche ottima da utilizzare nella preparazione del pesto.",
            ImageID: "786b1699-7b6b-4d6a-9d15-168224814a5c",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3
        },
        {
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            ProductID: "Mqn5Ii9g1NExocIOApk",
            NameProduct: "Salsa Rubra Piemontese",
            Description: "La salsa rubra non è altro che il ketchup piemontese dei nostri nonni!\n\nINGREDIENTI: Pomodori, zucchero, aceto di mele,paprika dolce, sale",
            ImageID: "9367da0e-5f28-4a16-b3a0-5e1c5673ee87",
            Quantity: 10,
            UnitOfMeasurement: "1 bag",
            Price: 3
        },
        {
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            ProductID: "Mqn5BRnLnhrC1BnxK8h",
            NameProduct: "Cavolfiore verde",
            Description: "Più dolce e delicato rispetto quello bianco. Il cavolfiore si adatta molto bene a una dieta ipocalorica grazie alla sua bassa quantità di calorie e ai pochi grassi. Contiene molta acqua e ha un buon contenuto di fibra, è utile per il controllo della glicemia e induce un certo senso di sazietà. Si presta benissimo a zuppe e vellutate, ma è ottimo anche da gratinare al forno!\n\nCavolfiore verde biologico da agricoltura sociale.\nPezzatura media.",
            ImageID: "dfb0fd73-37fd-4601-9f10-d5de474acebb",
            Quantity: 10,
            UnitOfMeasurement: "1kg",
            Price: 8
        }
    ];

    const farmers = [
        {
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            Distance: 1
        },
        {
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            Distance: 2
        },
        {
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            Distance: 2
        },
        {
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            Distance: 3
        },
        {
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            Distance: 4
        },
        {
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            Distance: 5
        }
    ];

    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '12-18-2021 11:11:11';
    const mockSetSideShow = jest.fn();
    const mockGetAllProductsByFarmers = (API.getAllProductsByFarmers = jest.fn());
    const mockGetFarmer = (API.getFarmer = jest.fn());
    const mockClientCheck = (API.clientCheck = jest.fn());
    const mockAddOrder = (API.addOrder = jest.fn());

    test('Correct render of the component for employee', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={employee}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            getByPlaceholderText('🔍 Search for a product...');
            getByPlaceholderText('👤 Choose a customer...');

            getByText('Azienda Agricola Sara Verdi');
            getByText('L\'orto del gallo');
            getByText('Societa\' Agricola La Cascina Del Mulino');
            getByText('Cascina Roseleto Di Giovanna Bianchi');
            getByText('Liriodendro Soc. Agr. Coop.');

            getByText('Finocchio');
            getByText('Formaggio Robiola Reale');
            getByText('Wurstel di suino');
        });
    });

    test('Correct render of the component for user', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            getByPlaceholderText('🔍 Search for a product...');

            getByText('Azienda Agricola Sara Verdi');
            getByText('L\'orto del gallo');
            getByText('Societa\' Agricola La Cascina Del Mulino');
            getByText('Cascina Roseleto Di Giovanna Bianchi');
            getByText('Liriodendro Soc. Agr. Coop.');

            getByText('Finocchio');
            getByText('Formaggio Robiola Reale');
            getByText('Wurstel di suino');

            getByText('€0.00')
        });
    });

    test('Search bar', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('🔍 Search for a product...'), {target: {value: 't'}});
        });
    });

    test('Summary of empty cart', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getAllByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('€0.00'));
            getAllByText('Checkout cart 🛒');
        });
    });

    test('Make an order', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });
        mockAddOrder.mockResolvedValue({'msg': 'Order succesfully added'});

        const {getByText, getAllByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getAllByText('+')[0]);
            fireEvent.click(getByText('€8.00'));
            fireEvent.click(getByText('Submit Order'));
        });
    });

    test('Description of a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getAllByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getAllByText('See Description')[0]);
            getAllByText('Finocchio');
            fireEvent.click(getByText('Close'));
        });
    });

    test('Increase/decrease quantity of a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-18-2021 11:11:11');
        mockGetAllProductsByFarmers.mockResolvedValue(allProductsByFarmers);
        mockGetFarmer.mockResolvedValue(farmers);
        mockClientCheck.mockResolvedValue({
            "Wallet": 10,
            "Money": 0
        });

        const {getByText, getAllByText, getByLabelText, getByPlaceholderText, getAllByDisplayValue} = render(
            <Router>
                <ProductTable
                    isLoggedIn={true}
                    user={user}
                    userList={userList}
                    timeMachine={mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getAllByDisplayValue('0')[0], {target: {value: 1}});
            fireEvent.click(getAllByText('+')[0]);
            fireEvent.click(getAllByText('-')[0]);
        });
    });
});