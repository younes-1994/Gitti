// $('.drawer').addClass("animated slideInRight");
// $('header').addClass("animated slideInDown delay-1ms");
// $('sidebar').addClass("animated slideInLeft delay-2ms");
// $('#progressBar').addClass("animated fadeIn delay-3ms");
// $('#describtionArea').addClass("animated fadeIn delay-4ms");
// $('#describtionActionsArea').addClass("animated fadeIn delay-5ms");
// $('#filesArea').addClass("animated slideInRight delay-6ms");

var Id = 0;

$(document).ready(function () {
    GetParam().then(() => {
        GetProjectDetails();
    })
});

function GetParam() {
    const urlParams = new URLSearchParams(window.location.search);
    Id = urlParams.get('id');
    return Promise.resolve();
}

function GetProjectDetails() {
    // if ($('#loginLoader').parent().prop("disabled") === true)
    //     return false;
    // $('#loginLoader').addClass("spinner-border spinner-border-sm");
    // $('#loginLoader').parent().prop("disabled", true);
    return $.ajax({
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        url: 'http://localhost:3000/GetProjectDetails',
        data: JSON.stringify({ id: Id }),
        success: function (res) {
            console.log('GetProjectDetails:', res.data);
            if (res.state === "success") {
                $('#intId').text(res.data.intId);
                $('#chName').text(res.data.chName);
                $('#chCreateDate').text(res.data.chCreateDate);
                $('#chExpireDate').text(res.data.chExpireDate);
                $('#chSupevisiorName').text(res.data.chSupevisiorName);

                //-----
                $('.progress-bar').addClass(calcProgressBar(res.data.chProgress));
                $('.progress-bar').css("width", res.data.chProgress + "%");
                //------
                $('#chDescribtion').html(`<p>${res.data.chDescribtion}</p>`);


            }
            return Promise.resolve(res.data);
        }
    });
}

function calcProgressBar(value) {
    if (value >= 0 && value < 26) {
        return 'bg-danger';
    }
    else if (value >= 26 && value < 51) {
        return 'bg-warning';
    }
    else if (value >= 51 && value < 76) {
        return 'bg-info';
    }
    else {
        return 'bg-teal';
    }
}

function onProgressCardClicked(item) {
    var value = $(item).find("h6").prop("id");
    $('#progress').removeClass();
    $('#progress').addClass(calcProgressBar(value));
    $('#progress').addClass("progress-bar progress-bar-striped progress-bar-animated");
    $('#progress').css("width", value + "%");
    $('#progressModal').modal('hide')
}

function uploadFile(event) {
    let List = [];
    let Files = event.target.files;
    let FileLength = Files.length;
    for (let i = 0; i < FileLength; i++) {
        let File = Files[i];
        let reader = new FileReader();
        reader.onloadend = () => {
            List.push({
                file: reader.result,
                name: File.name,
                size: File.size,
                type: File.type,
                lastModified: File.lastModified,
                lastModifiedDate: File.lastModifiedDate
            });

            let FilesList = `
                <div class="col-lg-2 col-md-3 col-sm-3 col-4" id="FilesItem">
                    <div class="upload-card">
                        <div class="overlay">
                            <p class="d-inline-block text-truncate">نام : ${File.name}</p>
                            <p class="d-inline-block text-truncate">سایز : ${File.size}</p>
                            <p class="d-inline-block text-truncate">نوع : ${File.type}</p>
                            <button id="${File.name}" class="ButtonBase IconButton" data-toggle="tooltip" data-placement="top" title="بستن" onclick="onCloseUpload(this)">
                                <svg class="SvgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="OpenInNew" style="color:var(--primary)">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                `;
            $('#FilesList').append(FilesList);

        }
        reader.readAsDataURL(File);
    }
}

function onCloseUpload(item) {
    $(item).closest("#FilesItem").remove();
}