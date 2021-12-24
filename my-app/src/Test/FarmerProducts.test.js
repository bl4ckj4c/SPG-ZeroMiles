import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import FarmerProducts from "../Components/FarmerProducts";
import API from "../API";
import ProductTable from "../Components/ProductTable";

describe('Test for FarmerProducts.js', () => {

    const farmer = {
        userID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
        Role: "Farmer",
        Name: "Mara",
        Surname: "Maionchi",
        Company: "Societa' Agricola La Cascina Del Mulino",
        FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
        Email: "mara.maionchi@hotmail.com",
        Password: "test",
        Phoneno: "9874515888",
        Address: "Via Giuseppe Verdi 33",
        City: "Torino",
        State: "TO",
        Zipcode: "10138",
        Distance: 2,
        Wallet: 0
    }

    const allProducts = [
        {
            Name: "Sorbetto al limone",
            Description: "Classico sorbetto per tutti i giorni dell'anno, grazie alle tante varietà di limoni del Sud Italia che si avvicendano per non lasciarci mai senza questo prezioso agrume alleato della salute e del sapore. SENZA LATTE.\nIngredienti: \nsucco di limone fresco, acqua, zucchero, destrosio, sciroppo di glucosio disidratato, farina di riso, inulina (fibra vegetale), proteine vegetali, pectina, farina di guar. \nConsiglio alternativo: frullatelo a bassa velocità con un po' di spumante e versatelo nei calici, diventerà un elegante e ancora più goloso sorbetto di fine pasto.",
            ImageID: "c93eec63-2608-4397-b0bf-66dd69bfcf3a",
            ProductID: "Mqn47bOD5kshTglDXup"
        },
        {
            Name: "Yogurt reale intero bianco",
            Description: "Yogurt prodotto con il nostro latte LATTE REALE (vacche alimentate con erba, fieno e modeste integrazioni di cereali scelti) e fermenti lattici; no aggiunta di zucchero. Una lenta fermentazione a bassa temperatura ci permette di ottenere uno yogurt denso e cremoso in maniera del tutto naturale.\nIngredienti e allergeni (evidenziati in maiuscolo):\nLATTE Reale intero di Cascina Roseleto, fermenti lattici vivi (streptococcus thermopilus, lactobacillus bulgaricus)\nCONSIGLI:\n- ottimo e salutare a colazione o merenda con cereali, semi di lino e semi di girasole;\n- per preparare soffici torte;\n- con del buon miele quando la gola fa i capricci...",
            ImageID: "5142a644-3908-4546-b1f6-cf3660c80181",
            ProductID: "Mqn4ADUJ2iHCr4fyGmN"
        },
        {
            Name: "Formaggio Robiola Reale",
            Description: "Solo il Latte Reale (alimentazione a pascolo in tutti i giorni utili dell'anno, fieno autoprodotto e cereali scelti) delle nostre #vacchefelici per produrre le robiole di Cascina Roseleto.\nINGREDIENTI: LATTE Reale, sale e caglio\nN.B. l'involucro nel quale è avvolta la robiola va riciclato nella plastica.\nQualche informazione in più!\nFormaggio a latte vaccino, intero, pasta bianca, abbastanza compatta, senza occhiatura, con struttura umida, gessata o granulosa. Ha sapore delicato, dolce di latte e di panna/burro, con presenza di un gradevole sentore acidulo fresco. In tavola viene generalmente consumata al naturale, ottima in insalata con sedano e noci o nocciole tostate; schiacciata, può essere impiegata per la preparazione di ripieni di vario genere o per preparare risotti.",
            ImageID: "78e2fb4f-3cfd-4c4d-bc15-cdd894981149",
            ProductID: "Mqn4FLzFUHAXSIS2lE6"
        },
        {
            Name: "Wurstel di suino",
            Description: "Prodotti a mano. Wurstel a base di carne suina, senza grassi aggiunti.\nOgni confezione contiene: 3 pezzi.\n\nIngredienti: Carne di suino, sale, spezie, aromi naturali, zucchero di canna.\n\nAntiossidante: ascorbato di sodio; conservante: nitrito di sodio.\n\nValore nutrizionale medio per 100 200g: Energia ( 250 Kcal 1046 kj) Grassi (21,1 200g di cui saturi 7,81 200g) Carboidrati (1,9 200g) Proteine ( 13,2 200g ) Sale ( 2,5 200g )",
            ImageID: "3a1e9e73-1df7-43ed-95ee-9b224e4f3a25",
            ProductID: "Mqn4HUlBrmA7gRw2Bly"
        },
        {
            Name: "Speck a fette",
            Description: "Speck di nostra produzione, realizzato con carni dei nostri suini, allevati su paglia come da tradizione.\n\nIngredienti: carne suina, sale, pepe nero e aromi.",
            ImageID: "c6f40131-9702-4235-bf31-7ad688e308a0",
            ProductID: "Mqn4JA8b1cgfLNUmD6n"
        },
        {
            Name: "Salsiccia fresca",
            Description: "Ricetta classica piemontese, con sale pepe e noce moscata. Un capolavoro della tradizione e dell'innovazione. L'avete mai provata nel chili o nei nachos?\n\nIngredienti: carne suina, sale marino, spezie ed erbe aromatiche, zucchero di canna.\nSENZA ANTIOSSIDANTI E CONSERVANTI.\nValore nutrizionale medio per 100 200g di prodotto: Energia 304 kCal 1273 kJ, Grassi 26.7 200g di cui saturi 8.61 200g, Carboidrati 0.6 200g, Proteine 15.4 200g, Sale 2.4 200g.",
            ImageID: "f71ad3f8-a346-4b6c-bb61-527e9fe019fc",
            ProductID: "Mqn4KCBPPhGtzPXHdkC"
        },
        {
            Name: "Prosciutto cotto affumicato",
            Description: "Prodotto artigianalmente come il nostro prosciutto cotto, affumicato con legno di faggio!!\n\n\nIngredienti: carne suina, spezie e aromi naturali, zucchero di canna.\nAntiossidante: ascorbato di sodio. Conservante:nitrito di sodio.\n\nvalori nutrizionali medi per 100 gr di prodotto: ENERGIA: 182 kCal 761 kj\nGRASSI: 11,9 gr di cui saturi 4,65 gr CARBOIDRATI: 0,8 gr di cui zuccheri 0,00 gr\nPROTEINE: 18 gr  SALE: 1,9 gr",
            ImageID: "68081257-996e-4815-b7d6-f9f408650c92",
            ProductID: "Mqn4MMpIpGiFx4AZ2Fa"
        },
        {
            Name: "Rustichelle di pollo ruspante",
            Description: "Le cosce disossate dei nostri polli ruspanti .\nOgni confezione contiene: 3-4 pezzi.",
            ImageID: "b3ab57e9-f5f7-4950-87bf-ea078331bf8b",
            ProductID: "Mqn4O4zRZpCqJaLz6p6"
        },
        {
            Name: "Petto di pollo a cubetti",
            Description: "Tenero petto di pollo, tagliato a cubetti e confezionato sotto vuoto",
            ImageID: "67874dde-fd0e-46bb-97e9-4c1213b36d40",
            ProductID: "Mqn4Q6oztxOkigs6FFh"
        },
        {
            Name: "Tagliata di fassone",
            Description: "Fetta scelta di coscia (noce o scamone) per una cottura rapida ma dal gran gusto.",
            ImageID: "766f9fec-2698-4208-8890-659650e4e7ce",
            ProductID: "Mqn4R0Fc7yiIu4LFA0f"
        },
        {
            Name: "Sottofiletto",
            Description: "Indicato per delle ottime fettine ai ferri e delle gustosissime tagliate.\nOgni confezione contiene: 5-6 fette.",
            ImageID: "188ea361-3d66-41d6-a269-66c15f4f2ba0",
            ProductID: "Mqn4SM1RAzEhYWMClpy"
        },
        {
            Name: "Mozzarella di bufala di Carmagnola",
            Description: "Mozzarella di bufala prodotta a Carmagnola dall'az. agr. Chicco Luca, che alleva le bufale e produce direttamente i formaggi",
            ImageID: "eafb6f83-c95e-4828-a27d-9bb732c4dc09",
            ProductID: "Mqn4U8XjOq9gnsB3csf"
        },
        {
            Name: "Preparato per riso",
            Description: "Sedano, olio evo, zucchini, peperoni, carote, cetrioli, aceto, olive, sale",
            ImageID: "d5a279d9-2b37-4c1e-9f99-24ada766d9ce",
            ProductID: "Mqn4VDICpfpS0Z6COdo"
        },
        {
            Name: "Caponata",
            Description: "Melanzane, pomodori, peperoni, cipolle, olio evo, aceto, sale.",
            ImageID: "eab1c966-d619-4289-ba9b-e2d6e5d8fc4e",
            ProductID: "Mqn4WOslXdeSxHP6phh"
        },
        {
            Name: "1 Bagnetto verde alla piemontese",
            Description: "Prezzemolo, olio Evo, aceto, sale, aglio.",
            ImageID: "38ba0c1e-fb10-4654-a797-f542534ae8ae",
            ProductID: "Mqn4Ymqe9LQrZTKjnDp"
        },
        {
            Name: "Zucca bio sottovuoto",
            Description: "Zucca del nostro orto confezionata sottovuoto in pacchi da 1 1kg.",
            ImageID: "b54d75be-ca61-49e8-9795-e61e8db5f792",
            ProductID: "Mqn4aQvxePe1NoWirsM"
        },
        {
            Name: "Pere Abate",
            Description: "Le pere abate sono eleganti, allungate, la loro buccia è verde chiaro/giallo, leggermente rugginosa. La polpa è bianca, profumata, molto succosa e fondente. Da mangiare fresca, semplicemente così, o da usare per i vostri dessert, torte, e perché no anche risotti!",
            ImageID: "3552b2bd-8092-4bdf-b2bf-eaffe7fb0ca3",
            ProductID: "Mqn4cEb8Dqxl6W74XjU"
        },
        {
            Name: "Mele renetta",
            Description: "La mela Renetta contiene diverse vitamine C, PP, B1, B2, A e sali minerali potassio, zolfo, fosforo, calcio, magnesio, sodio, ferro. \nContiene fruttosio, uno zucchero a basso indice glicemico, che mantiene relativamente costante la glicemia e che può essere consumato con moderazione anche dai soggetti diabetici.",
            ImageID: "d4fb6160-9652-4285-9cc4-f5641fa3f306",
            ProductID: "Mqn4daCnCVWhqAQyEAj"
        },
        {
            Name: "Rucola",
            Description: "Ortaggio ideal per insaporire le insalate e per insaporire i piatti di carne. La rucola è anche ottima da utilizzare nella preparazione del pesto.",
            ImageID: "786b1699-7b6b-4d6a-9d15-168224814a5c",
            ProductID: "Mqn4eVR20CqzemRVPE8"
        },
        {
            Name: "Porri",
            Description: "Ortaggio ricco di acqua (più del 90%), poco calorico. E' ricco di vitamina A, vitamina C e discrete quantità di vitamine del gruppo B, oltre che sali minerali come ferro e magnesio.",
            ImageID: "e16495fc-f76d-459e-b85a-17b2b7e79094",
            ProductID: "Mqn4flYxLLlARQHGcvS"
        },
        {
            Name: "Peperoni misti",
            Description: "Variamente utilizzati in cucina, ottimi se preparati ripieni. Per renderli più digeribili, si possono cucinare alla griglia, così sarà estremamente facile staccare la pellicola che li ricopre.",
            ImageID: "22271c42-ac98-46d1-bb95-e525cf2da883",
            ProductID: "Mqn4hLhkYukOFuCMH83"
        },
        {
            Name: "Minestrone",
            Description: "Verdure crude miste lavate per un saporito minestrone o contorno.Contiene fagioli borlotti.Il tempo di cottura è di circa un'ora in pentola normale,la cottura in pentola a pressione dimezza i tempi.\nIngredienti: \ncavolo verza, cavolfiore, sedano, porri, patate, carote, zucca, fagioli. Talvolta presenti coste e foglie di carota.",
            ImageID: "507db9eb-8efb-4253-b0cc-81d2d223b3ea",
            ProductID: "Mqn4j6IWEMLeQsjWhdD"
        },
        {
            Name: "Cipolle cotte al forno",
            Description: "Ottima per un pinzimonio di olio e aceto,mangiate anche semplicemente scaldate",
            ImageID: "af4ff163-b594-4541-a26d-6ff6f4fe3431",
            ProductID: "Mqn4kjxcKACcoeVUepD"
        },
        {
            Name: "Cima di rapa",
            Description: "Il piatto regionale più famoso da preparare con questo ingrediente sono le orecchiette con le cime di rapa, con diventano in realtà protagoniste di numerose ricette sia di primi che di secondi piatti.\n\nRicordiamo che le cime di rapa sono di stagione in autunno e in inverno perché la loro produzione avviene con le basse temperature.greenMe\n\nMarta Albè  MANGIARE \tDI STAGIONE 13-12-2016\nCime di rapa: proprietà, calorie e gli straordinari benefici\n cime di rapa benefici\nChi ama le cime di rapa sarà contento di scoprire le loro proprietà salutari. Le cime di rapa sono le infiorescenze della  Brassica rapa (subsp. sylvestris var. esculenta), un ortaggio tipicamente italiano che viene coltivato soprattutto il Puglia, Lazio e Campania.\n\nIl piatto regionale più famoso da preparare con questo ingrediente sono le orecchiette con le cime di rapa, con diventano in realtà protagoniste di numerose ricette sia di primi che di secondi piatti.\n\nRicordiamo che le cime di rapa sono di stagione in autunno e in inverno perché la loro produzione avviene con le basse temperature.\n\n\n \nCime di rapa, proprietà e benefici\nIl consumo di cime di rapa è consigliato soprattutto per la loro ricchezza di sali minerali. Le cime di rapa appartengono alla famiglia delle Brassicacee, come i cavoli e i cavolfiori, da cui derivano le loro proprietà benefiche.\n\nSono una fonte di ferro, fosforo e calcio per quanto riguarda i sali minerali. Apportano al nostro organismo vitamina A, vitamine del gruppo B e vitamina C, molto importante in autunno e in inverno per prevenire influenza e malanni di stagione. Ricordiamo infatti che la vitamina C non è presente soltanto negli agrumi ma anche nelle verdure e in altri frutti che ne sono molto ricchi, come i kiwi.",
            ImageID: "a36b8ac7-9176-46d1-b101-ad65d68f04b5",
            ProductID: "Mqn4lzP226nh0rsgyld"
        },
        {
            Name: "Ragu di coniglio",
            Description: "Ragu di coniglio grigio di carmagnola in bianco. Carne di coniglio grigio al 75%, SEDANO, carote, cipolle, sale, spezie e vino bianco . \n Ragu delicato e profumato con carne di coniglio grigio di carmagnola e verdure dell'orto, per condire dell'ottima pasta fresca.",
            ImageID: "ba86d939-2d22-46f9-93bb-905f76fc8913",
            ProductID: "Mqn4nEmqoqFan7gWXHW"
        },
        {
            Name: "Polenta",
            Description: "Farina di mais  per polenta tradizionale delle Langhe",
            ImageID: "6dcc7679-354b-4d3f-b632-4f06150727ee",
            ProductID: "Mqn4oNfAblFwYp8HgAm"
        },
        {
            Name: "Farinata",
            Description: "Preparata secondo la ricetta della tradizione con farina di ceci biologica, olio extravergine di oliva e sale integrale di Guerande.\n\nLa nostra farinata è un prodotto molto nutriente ed energetico. La farina di ceci contiene grassi e una discreta quantità di acidi grassi polinsaturi, proteine vegetali, fibre, e vitamine. E’ inoltre ricca di minerali come ferro, calcio e fosforo ed è utile per diminuire i livelli di colesterolo e trigliceridi nel sangue.\n\nIl sale integrale di Guerande viene prodotto in un paesino della Loira Atlantica. Raccolto ancora con tecniche manuali e con strumenti di legno per non alterarne la composizione, vanta un elevato contenuto di oligoelementi, tra cui il magnesio ed un ridotto contenuto di sodio. Meno salato degli altri sali, rivela delicati aromi floreali. Peso indicativo, può variare tra i 70 e i 100, da intendersi a pezzo",
            ImageID: "5a229f99-323b-4717-806d-352b72ce19af",
            ProductID: "Mqn4pZnAqaApbJD9UUS"
        },
        {
            Name: "Biscotti",
            Description: "Biscotti gusti vari, farina tipo 1 cioccolato e fichi, mandorle e noci, 5cereali e uvetta, burro di cascina, lievito naturale.\nI gusti dipendono  in base alla disponibilità essendo fatti artigianalmente.",
            ImageID: "accd554c-75ea-41f7-870b-fbafa549113f",
            ProductID: "Mqn4qddS7Qo1z5uRZLY"
        },
        {
            Name: "Bonèt",
            Description: "Classico dolce piemontese al cioccolato e amaretti con caramello - fatto con  latte e panna di alta qualità.\n\nALLERGENI: latte - frutta a guscio ( mandorle)\n\nSPECIFICAMENTE FORMULATO PER PERSONE INTOLLERANTI AL GLUTINE",
            ImageID: "b6eb5f5c-d316-4e11-988b-337d894d2a1c",
            ProductID: "Mqn4sh6S8ZCzMee72pL"
        },
        {
            Name: "Toma affinata all'aceto balsamico",
            Description: "Toma di latte vaccino di media stagionatura, affinata all'aceto balsamico.",
            ImageID: "60d84441-df4b-4838-a8df-a4f72eb90c8e",
            ProductID: "Mqn4u9Yb7t4HIvYkYi8"
        },
        {
            Name: "Toma a pasta cotta invecchiata",
            Description: "Toma a pasta cotta invecchiata.\n\nFormaggio di latte vaccino a pasta compatta di media stagionatura. Lavorazione con latte pastorizzato. Gusto di media intensità.",
            ImageID: "29db5d48-1540-4601-ad16-64075149b685",
            ProductID: "Mqn4vx9iiZHfBhBVHq0"
        },
        {
            Name: "Reblochon",
            Description: "Formaggio di latte vaccino, dolce e cremoso. E' l'ingrediente fondamentale di un piatto tipico dell'Alta Savoia, la tartiflette, composta insieme a questo formaggio da patate, cipolle e pancetta!",
            ImageID: "4b1a7217-6ea9-432b-ae6f-490e64f29ac0",
            ProductID: "Mqn4xOcYEYnzqaT7PVY"
        },
        {
            Name: "Parmigianata",
            Description: "Formaggio di latte vaccino, simile a un parmigiano per lavorazione e gusto.",
            ImageID: "0b2b2fb3-b959-49a2-a87f-bd1d9696b5eb",
            ProductID: "Mqn4yp2syc0wMxxor7K"
        },
        {
            Name: "Goccia Blu",
            Description: "Formaggio vaccino blu dal gusto cremoso. Ottimo specialmente se accompagnato da un buon vino rosso dolce a esaltarne il gusto.",
            ImageID: "d9e5b4ec-f5f6-4cf1-93eb-800871cf82b5",
            ProductID: "Mqn4zl8bSV7abehyu18"
        },
        {
            Name: "Gran Capra",
            Description: "Il GRAN CAPRA è un formaggio da tavola di puro latte caprino stagionato 20 mesi. \nFormaggio che si presta benissimo a grattugiare come un Grana.",
            ImageID: "27c8083d-b684-4182-971f-5fa751854bc6",
            ProductID: "Mqn50IEZa0jIngRbT5E"
        },
        {
            Name: "Burro",
            Description: "Burro 82% di latte vaccino, una delizia da spalmare sul pane con la marmellata a colazione o per un sostanzioso spuntino!",
            ImageID: "6dc91a8e-2248-4dd5-a73f-b8c9db0532b7",
            ProductID: "Mqn51hp1a5sTWrNrthA"
        },
        {
            Name: "Blu di Savoia",
            Description: "Formaggio blu di latte vaccino, molto gustoso e a pasta compatta.",
            ImageID: "a40255b1-f005-4a25-8990-28fcabf75eae",
            ProductID: "Mqn53CuR6238LV4QIB7"
        },
        {
            Name: "Grappa",
            Description: "La caratteristica principale di questa grappa è la presenza  all'interno della bottiglia di una fetta di patata viola . La patata rilascia il colore e la rende decisamente più morbida alla gola.",
            ImageID: "ce27a051-73a4-486e-b380-0d9e96e74fa4",
            ProductID: "Mqn54SFvaQ9KIw0DvHm"
        },
        {
            Name: "Pere Williams",
            Description: "Varietà di pera di origine inglese dalla forma a \"fiaschetto\" e dal sapore dolce e zuccherino. Ideale per essere sciroppata grazie alla sua polpa soda e compatta adatta anche per la trasformazione in frutta sciroppata e per la preparazione di succhi o marmellate.\n\nProdotto biologico, proveniente dall'Azienda Agricola Terre di frutta di Cavour (TO)",
            ImageID: "139ff162-ce0b-4912-a275-033b38922a4d",
            ProductID: "Mqn55wPMAcN2mcqkbuE"
        },
        {
            Name: "Zucche",
            Description: "E' una miniera di caroteni e provitamina A. Presenta un gusto delicato ed è molto versatile in cucina, infatti può essere usata per ricette di tutti i tipi, dai contorni, al pane, ai primi piatti, fino ad arrivare persino ai dolci!\n\nDa agricoltura biologica e sociale, molto colorata.",
            ImageID: "83442320-a70f-416b-b309-674b80564a34",
            ProductID: "Mqn57CO3pTGH1w7OOu7"
        },
        {
            Name: "Peperoni",
            Description: "Peperone biologico, croccante e gustoso.\nI peperoni sono ortaggi saporiti utilizzati per svariate ricette possono essere consumati sia cotti sia crudi. Grigliati, in salamoia, fatti a crema, ripieni, fritti e come ingrediente in moltissimi piatti, trovano sempre il loro posto in cucina.",
            ImageID: "4eab8853-7935-4694-a220-4ef69cc62a80",
            ProductID: "Mqn58PHRSa12OeguiUT"
        },
        {
            Name: "Finocchio",
            Description: "Prodotto biologico. Ortaggio croccante e profumato, utilissimo per il nostro organismo grazie alle sue proprietà digestive. Può essere consumato sia crudo che cotto. I finocchi gratinati sono un piatto davvero squisito!",
            ImageID: "d00e6d5b-7f12-403b-bf81-3f825c1d5393",
            ProductID: "Mqn59ZJN1Q8cyrj3oGj"
        },
        {
            Name: "Cavolfiore verde",
            Description: "Più dolce e delicato rispetto quello bianco. Il cavolfiore si adatta molto bene a una dieta ipocalorica grazie alla sua bassa quantità di calorie e ai pochi grassi. Contiene molta acqua e ha un buon contenuto di fibra, è utile per il controllo della glicemia e induce un certo senso di sazietà. Si presta benissimo a zuppe e vellutate, ma è ottimo anche da gratinare al forno!\n\nCavolfiore verde biologico da agricoltura sociale.\nPezzatura media.",
            ImageID: "dfb0fd73-37fd-4601-9f10-d5de474acebb",
            ProductID: "Mqn5BRnLnhrC1BnxK8h"
        },
        {
            Name: "Cavolo nero",
            Description: "Da agricoltura sociale e biologica, mazzi da circa 400g\nIl colore scuro e le foglie arricciate caratterizzano questo vegetale ricco di antiossidanti, vitamine e sali minerali. Molto versatile e a basso contenuto calorico, è l'ingrediente perfetto per numerose ricette tra cui deliziose zuppe e minestre.",
            ImageID: "c3538088-a15f-4603-b935-02e4348f2079",
            ProductID: "Mqn5DKF2AAoty8KXLYP"
        },
        {
            Name: "Aglio",
            Description: "Uno degli elementi più apprezzati in cucina, l'aglio ha numerose virtù grazie all'elevata concentrazione di allicina, il principio attivo che protegge la pianta dai parassiti che potrebbero attaccarla: è un potente antibatterico, antisettico e permette di abbassare la pressione arteriosa. \n\nIn vendita a mazzetto. Prodotto biologico, da agricoltura sociale.",
            ImageID: "111c5ab8-425d-4e34-ba00-bb9cf599444a",
            ProductID: "Mqn5ERM25V6suRxeXpU"
        },
        {
            Name: "Costine",
            Description: "Costina da taglio verde dal sapore molto dolce. Da sbollentare un attimo in padelle e condire con olio, sale e limone oppure poi da ripassare in padella con aglio e olio.\n\nMazzo costine da mezzo 1kg, prodotto biologico, da agricoltura sociale.",
            ImageID: "6fd5e5df-5fd3-4f15-98b3-8a75824ae14a",
            ProductID: "Mqn5Fe57EePWUW6WeoI"
        },
        {
            Name: "Nettare di Pere",
            Description: "Il nostro nettare di pera non contiene conservanti nè aromi artificiali, ed è prodotto utilizzando sola frutta fresca raccolta al giusto grado di maturazione. Le pere provengono dai nostri frutteti e vengono lavorate nel nostro laboratorio lasciando inalterato il vero sapore del frutto. Questo nettare è ottenuto dalla purea di frutta alla quale viene aggiunta una parte di acqua, per renderlo più bevibile, e successivamente zucchero e succo di limone. Ideale da bere fresco a colazione o per una dolce merenda.\n\nIngredienti: Pere, acqua, zucchero, succo di limone.",
            ImageID: "8f202914-a21c-457c-884a-241a91585442",
            ProductID: "Mqn5HZlthFUAqri5HDT"
        },
        {
            Name: "Salsa Rubra Piemontese",
            Description: "La salsa rubra non è altro che il ketchup piemontese dei nostri nonni!\n\nINGREDIENTI: Pomodori, zucchero, aceto di mele,paprika dolce, sale",
            ImageID: "9367da0e-5f28-4a16-b3a0-5e1c5673ee87",
            ProductID: "Mqn5Ii9g1NExocIOApk"
        },
        {
            Name: "Nocciomiele crema spalmabile",
            Description: "Crema spalmabile ottenuta dall'unione di due ingredienti: nocciole TGT tostate e miele d'acacia piemontese.\nColtiviamo i nostri noccioleti naturalmente, senza fare uso di prodotti fitosanitari di sintesi e servendoci esclusivamente di fertilizzanti organici e una volta che terminiamo la raccolta delle nocciole le lasciamo ad essiccare al calore del sole.\nLa nocciola è un alimento ricco di grassi insaturi, di omega 6 e vitamina E.\n\nIngredienti: Nocciole TGT (60%) e miele d'acacia piemontese. (prodotto senza glutine)",
            ImageID: "d96ce474-ffa1-4ebe-af59-da46c28b5135",
            ProductID: "Mqn5JyKLTbGM5UErNqG"
        },
        {
            Name: "Conserva di Pomodoro",
            Description: "Sugo pronto, per preparare un primo velocemente.\n\nINGREDIENTI: Pomodoro (90%), cipolla, carota, sedano, olio extra vergine d’oliva, sale, aglio.\n\nOrigine del pomodoro: Italia (Asti)\n\nValori nutrizionali medi per 100 gr. : Energia 191 KJ/46 kcal, Grassi 1,9 200g di cui acidi grassi saturi 0,3 200g, Carboidrati 4 200g di cui zuccheri 3,6 200g, Proteine 1,8 200g, Sale 0,7 200g",
            ImageID: "40432af5-4cea-4ca1-8eab-229c0b4ec193",
            ProductID: "Mqn5LC3cRpyZMwk6bvz"
        },
        {
            Name: "Composta di Ramasin",
            Description: "Appena raccolti denoccioliamo i ramasin delicatamente per poter ottenere una composta dalla consistenza morbida e dal buon sapore intatto di ramasin appena staccati dalla pianta.\nPer ottenere 100 grammi di prodotto utiliziamo 130 grammi di ramasin e sono banditi qualsiasi tipo di conservante, additivo chimico e colorante.\nQuesta composta è ideale da spalmare sul pane, per guarnire gelati, per realizzare irresistibili cheesecake e per altri molteplici usi.\nLe composte rispetto alle confetture contengono più frutta e di conseguenza meno zucchero.\n\nIngredienti: ramasin (70%), zucchero, pectina da mele",
            ImageID: "44243d66-66c4-4c38-aa96-60c27eb2d594",
            ProductID: "Mqn5MQEBi5XO7pG0AzZ"
        },
        {
            Name: "TEST",
            Description: "asdf",
            ImageID: "254c1e29-dceb-0cc9-1ccf-3e74af502fd5",
            ProductID: "TIRybEd4EdP9ClCKeZHk"
        }
    ];

    const productsByFarmers = [
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
        }
    ];

    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '12-22-2021 11:11:11';
    const mockGetAllProducts = (API.getAllProducts = jest.fn());
    const mockGetProductsByFarmers = (API.getProductsByFarmer = jest.fn());
    const mockAddProduct = (API.addProduct = jest.fn());
    const mockDeleteProduct = (API.deleteProduct = jest.fn());


    test('Correct render of the component', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            getByPlaceholderText('🍳 Choose a product...');

            getByText('Add');
            getByText('Create new product');

            getByText('Nettare di Pere');
        });
    });

    test('Correct render of the component without products', async () => {
        mockReturnTimeMachine.mockReturnValue('12-15-2021 11:11:11');
        const mockTimeMachine2 = '12-15-2021 11:11:11';
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine2}
                />
            </Router>
        );

        await waitFor(() => {
            getByPlaceholderText('🍳 Choose a product...');

            getByText('Add');
            getByText('Create new product');
        });
    });

    test('Correct render of the component with error in getProductsByFarmer', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockRejectedValue(new Error('test error'));
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            getByPlaceholderText('🍳 Choose a product...');

            getByText('Add');
            getByText('Create new product');
        });
    });

    test('Test the searchbar', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('🍳 Choose a product...'), {target: {value: 'W'}});
            fireEvent.click(getByText('Wurstel di suino'));
        });
    });

    test('Open the image of a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText, getAllByTestId} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getAllByTestId('product-image-testid')[0]);
        });
    });

    test('Edit a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText, getByDisplayValue} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getAllByText('Edit')[0]);

            getByText('Enter the price in the 0.00 format');
            fireEvent.change(getByDisplayValue('5.5'), {target: {value: '5.5'}});

            getByText('Enter the quantity');
            fireEvent.change(getByDisplayValue('1'), {target: {value: '1'}});

            getByText('Enter the unit of measurement');
            fireEvent.change(getByDisplayValue('bag'), {target: {value: 'bag'}});

            fireEvent.click(getByText('Edit the product'));
        });
    });

    test('Add a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText, getByDisplayValue, getByTestId} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('🍳 Choose a product...'), {target: {value: 'W'}});
            fireEvent.click(getByText('Wurstel di suino'));
            fireEvent.click(getByText('Add'));

            getByText('Enter the price in the 0.00 format');
            fireEvent.change(getByTestId('price-testid'), {target: {value: '5.5'}});

            getByText('Enter the quantity');
            fireEvent.change(getByTestId('quantity-testid'), {target: {value: '1'}});

            getByText('Enter the unit of measurement');
            fireEvent.change(getByTestId('unit-testid'), {target: {value: 'bag'}});

            fireEvent.click(getByText('Add the product'));
        });
    });

    test('Add a product with wrong fields', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText, getByDisplayValue, getByTestId} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('🍳 Choose a product...'), {target: {value: 'W'}});
            fireEvent.click(getByText('Wurstel di suino'));
            fireEvent.click(getByText('Add'));

            getByText('Enter the price in the 0.00 format');
            fireEvent.change(getByTestId('price-testid'), {target: {value: '-7'}});
            fireEvent.click(getByText('Add the product'));
            getByText('⚠️ Please, enter a valid price');

            getByText('Enter the quantity');
            fireEvent.change(getByTestId('price-testid'), {target: {value: '5.5'}});
            fireEvent.change(getByTestId('quantity-testid'), {target: {value: '-7'}});
            fireEvent.click(getByText('Add the product'));
            getByText('⚠️ Please, enter a valid quantity');

            getByText('Enter the unit of measurement');
            fireEvent.change(getByTestId('price-testid'), {target: {value: '5.5'}});
            fireEvent.change(getByTestId('quantity-testid'), {target: {value: '1'}});
            fireEvent.change(getByTestId('unit-testid'), {target: {value: ''}});
            fireEvent.click(getByText('Add the product'));
            getByText('⚠️ Please, enter the unit');
        });
    });

    test('Delete a product', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetAllProducts.mockResolvedValue(allProducts);
        mockGetProductsByFarmers.mockResolvedValue(productsByFarmers);
        mockAddProduct.mockResolvedValue({productByFarmerID: 'OGwux1b1SShh4iBeN59f'});
        mockDeleteProduct.mockResolvedValue({ msg: 'Product succesfully deleted' });

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText, getByDisplayValue} = render(
            <Router>
                <FarmerProducts
                    user={farmer}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getAllByText('Delete')[0]);
        });
    });
});