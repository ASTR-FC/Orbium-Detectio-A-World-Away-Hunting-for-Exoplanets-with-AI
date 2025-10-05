// Liste des thèmes disponibles
const themes = ['dark', 'light', 'santa', 'clean', 'rain', 'storm', 'snow'];
// Indice du thème actuel
let currentThemeIndex = 0;

// Fonction pour appliquer un thème
function applyTheme(themeName)
{
    const body = document.body;

    // Supprime tous les thèmes actuels
    themes.forEach(theme => {
        body.classList.remove(theme);
    });

    // Applique le nouveau thème
    if (themes.includes(themeName))
    {
        body.classList.add(themeName);
    } else
    {
        // Si le thème n'est pas trouvé, applique le thème par défaut
        body.classList.add(themes[0]);
    }
}

// Fonction pour changer de thème
function toggleTheme()
{
    const body = document.body;

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(themes[currentThemeIndex]);
}

// Écouteur d'événement pour le raccourci clavier T
document.addEventListener('keydown', function(event)
{
    if (event.key === 't')
    {
        
        event.preventDefault();
        
        toggleTheme();
    }
});

// Applique le thème par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', function()
{
    applyTheme(themes[currentThemeIndex]);
});
