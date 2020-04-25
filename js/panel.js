// $('.drawer').addClass("animated slideInRight");
// $('.info-card').eq(0).addClass("animated fadeIn");
// $('.info-card').eq(1).addClass("animated fadeIn delay-1ms");
// $('.info-card').eq(2).addClass("animated fadeIn delay-2ms");
// $('.card-table').addClass("animated fadeIn delay-3ms");
// $('footer').addClass("animated slideInUp delay-4ms");

$(document).ready(function () {
    GetProjectList();
    $('[data-toggle="tooltip"]').tooltip();
});

function GetProjectList() {
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        url: 'http://localhost:3000/GetProjectList',
        success: function (res) {
            console.log('res:', res);
            if (res.state === "success") {
                if (res.data.length > 0) {
                    var ProjectListTable = '';
                    $.each(res.data, function (key, value) {
                        ProjectListTable += '<tr>';
                        ProjectListTable += `<td>${value.intId}</td>`;
                        ProjectListTable += `<td>${value.chName}</td>`;
                        ProjectListTable += `<td>${value.chSupevisiorName}</td>`;
                        ProjectListTable += `<td>${value.chCreateDate}</td>`;
                        ProjectListTable += `<td>${value.chExpireDate}</td>`;
                        ProjectListTable += `
                        <td class="text-center">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated ${calcProgressBar(value.chProgress)}" role="progressbar" style="width: ${value.chProgress}%"></div>
                            </div>
                        </td>`;
                        ProjectListTable += `
                        <td class="p-0">
                            <button id="${value.intId}" class="ButtonBase IconButton" data-toggle="tooltip" data-placement="top" title="باز کردن" onclick="onOpenClicked(this)">
                                <svg class="SvgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="OpenInNew" style="color:var(--primary)">
                                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                                </svg>
                            </button>
                        </td>`;
                        ProjectListTable += '</tr>';
                    });
                    $('#ProjectListTable').append(ProjectListTable);
                }
            }
        },
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

function onOpenClicked(item) {
    window.location.href = `./project.html?id=${item.id}`
}