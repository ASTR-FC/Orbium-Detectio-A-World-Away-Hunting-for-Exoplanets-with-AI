$(document).ready(function()
{
    let eventSource;

    $("#uploadForm").submit(function(e)
    {
        e.preventDefault();
        let formData = new FormData(this);

        $("#logs-section").show();

        $("#logs").empty();

        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response)
            {
                if (response.status === 'processing')
                    {
                    // Démarrer la connexion SSE pour recevoir les logs
                    eventSource = new EventSource(`/process/${response.temp_path}`);

                    eventSource.onmessage = function(e)
                    {
                        let data = JSON.parse(e.data);
                        if (data.log)
                        {
                            $("#logs").append(`<p>${data.log}</p>`);
                        } else if (data.error)
                        {
                            $("#logs").append(`<p style="color: red;">${data.error}</p>`);
                            eventSource.close();
                        } else
                        {
                            // Afficher les résultats finaux
                            let results = JSON.parse(data);
                            $("#predictions-result").html(results.predictions);
                            $(".predictions-section").show();

                            let metrics = results.metrics;
                            $("#accuracy").text(metrics.accuracy.toFixed(2));
                            $("#sensitivity").text(metrics.sensitivity.toFixed(2));
                            $("#specificity").text(metrics.specificity.toFixed(2));
                            $("#precision").text(metrics.precision.toFixed(2));
                            $("#f1-score").text(metrics.f1_score.toFixed(2));
                            $(".statistics-section").show();

                            // Afficher la section d'export
                            $("#export-section").show();
                            eventSource.close();
                        }
                    };

                    eventSource.onerror = function()
                    {
                        $("#logs").append(`<p style="color: red;">Erreur de connexion au serveur.</p>`);
                        eventSource.close();
                    };
                }
            },
            error: function(xhr)
            {
                $("#logs").append(`<p style="color: red;">Erreur : ${xhr.responseText || xhr.statusText}</p>`);
            }
        });
    });

    // Gestion des exports
    $("#export-csv").click(function()
    {
        alert("Export en CSV (à implémenter)");
    });

    $("#export-pdf").click(function()
    {
        alert("Export en PDF (à implémenter)");
    });
});
