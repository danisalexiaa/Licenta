import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Alexia',
            email:'danisalexia@yahoo.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
        name: 'Joe Eszterhas',
        email:'joeeszterhas@gmail.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: false,
        }


    ],

    films: [
        {
            name: 'Suspiria',
            genre: 'Horror',
            image: '/images/film8.jpg',
            price: 25,
            countInStock: 30,
            rating: 4,
            numReviews: 89.785,
            description: 'Suspiria este un film italian din 1977 regizat de Dario Argento. Este creat în genurile fantastic, de groază, mister. Rolurile principale au fost interpretate de actorii Jessica Harper, Stefania Casini, Flavio Bucci, Miguel Bosé, Alida Valli, Udo Kier și, în ultimul ei rol într-un film, Joan Bennett.',
            an: 1977
        },
        {
            name: 'Inferno',
            genre: 'Horror',
            image: '/images/film2.jpg',
            price: 20,
            countInStock: 0,
            rating: 3.5,
            numReviews: 20.679,
            description: 'Inferno este un film de groază supranatural din 1980 scris și regizat de Dario Argento. În rolurile principale au interpretat actorii Irene Miracle, Leigh McCloskey, Eleonora Giorgi, Daria Nicolodi și Alida Valli. Face parte din Trilogia Le tre madri, după Suspiria, fiind urmat de A treia mamă.',
            an: 1980
        },
        { 
            name: 'Beetlejuice',
            genre: 'Horror',
            image: '/images/film3.jpg',
            price: 25,
            countInStock: 29,
            rating: 4,
            numReviews: 287.316,
            description: 'Beetlejuice este un film de groază de comedie și fantastic american din 1988 regizat de Tim Burton. Rolurile principale au fost interpretate de actorii Michael Keaton (în rolul principal) și Alec Baldwin și Geena Davis ca un cuplu de tineri decedați care ajung să bântuie casa în care au locuit. A primit Premiul Saturn pentru cel mai bun film de groază.',
            an: 1988
        },
        {
            name: "Don't look now",
            genre: 'Horror',
            image: '/images/film4.jpg',
            price: 25,
            countInStock: 30,
            rating: 4,
            numReviews:54.462,
            description: 'Doi soti isi plang fiica decedata recent prin inec, aflandu-se la Viena, cand intalnesc doua surori in varsta, dintre care una este medium, ce aduce un avertisment de pe lumea cealalta. Sotul, in schimb, are si el unele flashuri misterioase, vazandu-si fiica intr-o capa rosie pe strada, pe sotia lui si pe cele doua misterioase surori pe o gondola funerara.',
            an: 1973
        },
        { 
            name: 'Alice, sweet Alice',
            genre: 'Horror',
            image: '/images/film5.jpg',
            price: 20,
            countInStock: 20,
            rating: 3,
            numReviews:10.980,
            description: 'In anul 1961, viata unui cuplu recent divortat se rastoarna cu susul in jos atunci cand una din fiicele lor este suspectata pentru uciderea brutala a surorii mai mici in timpul unui ritual sfant, fiind urmata de o serie de injunghieri subsecvente. ',
            an: 1976
        },
        { 
            name: 'Deep Red',
            genre: 'Horror',
            image: '/images/film6.jpg',
            price: 35,
            countInStock: 10,
            rating: 4.5,
            numReviews: 36.669,
            description: 'Un pianist de jazz si un jurnalist iute la minte sunt prinsi intr-o panza complexa de mistere atunci cand cel din urma devine martor la asasinarea unui medium.',
            an: 1975
        },
        {
            name: 'The Lost Boys',
            genre: 'Horror',
            image: '/images/film9.jpg',
            price: 25,
            countInStock: 20,
            rating: 4,
            numReviews: 137.669,
            description: 'Kiefer Sutherland. Regretatul Corey Haim. JOEL SCHUMACHER, regizor. Reteta perfecta pentru un film de groaza presarat cu cateva momente pline de sarcasm si umor negru cu vampiri, despre vampiri. The Lost Boys a primit Premiul Saturn pentru cel mai bun film de groaza al anului. Sleep all day. Party all night. Never grow old, never die. Its fun to be a vampire',
            an: 1987
        },
        { 
            name: 'The Shining',
            genre: 'Thriller',
            image: '/images/film10.jpg',
            price: 30,
            countInStock: 19,
            rating: 4.5,
            numReviews: 972.605,
            description: 'Stanley Kubrick ne prezinta o capodopera din cariera sa de regizor, o adaptare a celebrului roman "The Shining", al lui Stephen King. In rolurile principale joaca inconfundabilul Jack Nicholson, Shelley Duvall, si micul (pe atunci) Danny Lloyd. Familia se indreapta spre un hotel izolat in toiul iernii, cand o furtuna se abate asupra lor si ii obliga sa ramana acolo. Nu si-ar fi dat seama niciodata de aventura insangerata ce avea sa-i astepte. "Aparent un film despre un hotel bantuit, reuseste sa traverseze o lume complexa de nebunie incipienta, crima si viziuni supranaturale... si reuseste sa-ti dea fiori" Ian Nathan, Empire Magazine. ',
            an: 1980
        },
    ],
}

export default data;