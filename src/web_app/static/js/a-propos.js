// Données des utilisateurs
const users = [
    {
        lastname: 'ASTRA',
        firstname: '',
        img: "https://scontent-fra3-2.cdninstagram.com/v/t51.2885-19/476768987_612251251514525_1736974503557090849_n.jpg?stp=cp0_dst-jpg_s110x80_tt6&_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDI0LkMzIn0%3D&_nc_ohc=K2rEqFYMBqgQ7kNvwG_Ktj7&_nc_oc=AdmKktr03SmmCQmiOfVaHFw_M9oJwSrZZm8fGRUhYAxxKpsTMpBPMosoBUDDIFRBw0qJ1HcjtZCb_ine-oN1UQz2&_nc_zt=24&_nc_ht=scontent-fra3-2.cdninstagram.com&oh=00_AfdrnQymowS3h_0WXxEOCHoCyVnUxLXVsKBIgfhTTEGseg&oe=68E7338B",
        buttonName: "Instagram",
        link: 'https://www.instagram.com/astra_fcomte/'
    },
    {
        lastname: 'Barrales Martinez',
        firstname: 'Aaron',
        img: "https://scontent-fra5-2.cdninstagram.com/v/t51.2885-19/487750575_1416395466192405_4199205062988421753_n.jpg?stp=cp0_dst-jpg_s110x80_tt6&_nc_cat=109&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=_kunigdkibsQ7kNvwEH5kFR&_nc_oc=AdlBkjyfcSOC1DG9myL8LK1X_9gUU685Xtj-tGjAXtvM2lIbWH0rTg8grQtez-kvNsz-tx_0D3frmJtOPfx5HWp3&_nc_zt=24&_nc_ht=scontent-fra5-2.cdninstagram.com&oh=00_AfcDXnB5UW0WI3Os-ULlu87zzaint72vXWdw2R0igkb3Sg&oe=68E73C40",
        buttonName: "Instagram",
        link: 'https://www.instagram.com/barrales.gravitas/'
    },
    {
        lastname: 'Amaimi',
        firstname: 'Essil',
        img: "https://media.licdn.com/dms/image/v2/D4E03AQGpqeV89UEABw/profile-displayphoto-scale_200_200/B4EZjHGxGHGwAY-/0/1755687107374?e=2147483647&v=beta&t=uMu9oIpkbkZ_8Zf2hAVOEuLbRDL68uwTcNabDZYQrrU",
        buttonName: "LinkedIn",
        link: 'http://linkedin.com/in/essil-amaimi-101736226'
    },
    {
        lastname: 'Ait Gougam',
        firstname: 'Ferhat',
        img: "https://media.licdn.com/dms/image/v2/D4D35AQFRqrFacMgPmQ/profile-framedphoto-shrink_200_200/B4DZcignGJHwAY-/0/1748630663819?e=1760209200&v=beta&t=MHY_08FnPkLlJCBfCEQw8UbbgOr_TZXcka9OGbMd8qw",
        buttonName: "LinkedIn",
        link: 'https://www.linkedin.com/in/ferhat-ait-gougam-04605a344/'
    },
    {
        lastname: 'Ntsika',
        firstname: 'Keneith Yoane',
        img: "https://media.licdn.com/dms/image/v2/D5603AQGTNsmME1Goyg/profile-displayphoto-scale_200_200/B56ZmlaJ.5H8AY-/0/1759416725138?e=1762387200&v=beta&t=7xFHyvwGhDx9tx_24IYG8HPKvjovPcXJfsXY5Gge8cw",
        buttonName: "LinkedIn",
        link: 'https://www.linkedin.com/in/keneith-yoane-ntsika-40b913312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
        lastname: 'Foucon',
        firstname: 'Willfrid',
        img: "https://avatars.githubusercontent.com/u/57151468?v=4",
        buttonName: "Github",
        link: 'https://github.com/UnExtraterrestres'
    }
];

// Fonction pour créer et afficher les utilisateurs
function displayUsers() {
    const usersContainer = document.querySelector('.users-container');

    if (!usersContainer) {
        console.error("Le conteneur des utilisateurs n'a pas été trouvé.");
        // console.log("Voici les éléments présents dans le document :", document.body.innerHTML);
        return;
    }

    // console.log("Conteneur trouvé :", usersContainer);

    // Vide le conteneur pour éviter les doublons
    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userContainer = document.createElement('div');
        userContainer.className = 'user-container';

        const userImg = document.createElement('img');
        userImg.width = 100;
        userImg.height = 100;
        userImg.src = user.img;
        userImg.alt = `${user.lastname} ${user.firstname}'s Avatar`;
        userImg.className = 'user-img';

        const userNameSpan = document.createElement('span');
        userNameSpan.className = 'user-name';

        const lastnameHeading = document.createElement('h3');
        lastnameHeading.id = 'lastname';
        lastnameHeading.textContent = user.lastname;

        const firstnameHeading = document.createElement('h3');
        firstnameHeading.textContent = user.firstname;

        const userLink = document.createElement('a');
        userLink.href = user.link;
        userLink.className = 'button';
        userLink.target = '_blank';
        userLink.textContent = user.buttonName;

        // Ajoute les éléments créés au conteneur de l'utilisateur
        userNameSpan.appendChild(lastnameHeading);
        userNameSpan.appendChild(firstnameHeading);

        userContainer.appendChild(userImg);
        userContainer.appendChild(userNameSpan);
        userContainer.appendChild(userLink);

        // Ajoute le conteneur de l'utilisateur au conteneur principal
        usersContainer.appendChild(userContainer);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM entièrement chargé, appel de displayUsers...");
    displayUsers();
});
