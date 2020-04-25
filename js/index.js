$(document).ready(function () {
    $('.splash').addClass("splash-active");
    $('.card').addClass("animated fadeIn delay-2ms");
});

$("#passwordWatcher").on("click", function () {
    event.preventDefault();
    if ($(this).prev().prop("type") === "password") {
        $(this).prev().prop("type", "text");
    }
    else {
        $(this).prev().prop("type", "password");
    }
});

$.validator.setDefaults({
    errorClass: 'error',
    errorPlacement: function (error, element) {
        error.appendTo(element.prev());
    },
    highlight: function (element) {
        $(element).closest(".form-control").addClass("form-control--invalid");
    },
    unhighlight: function (element) {
        $(element).closest(".form-control").removeClass("form-control--invalid");
    }
});

$("form[name='Login']").validate({
    rules: {
        userName: "required",
        password: "required",
    },
    messages: {
        userName: { required: "این فیلد اجباری است", },
        password: { required: "این فیلد اجباری است", },
    },

    submitHandler: function (form) {
        event.preventDefault();
        Login(form);
    }
});

function Login(form) {
    if ($('#loginLoader').parent().prop("disabled") === true)
        return false;
    $('#loginLoader').addClass("spinner-border spinner-border-sm");
    $('#loginLoader').parent().prop("disabled", true);
    var data = JSON.stringify({
        userName: form.userName.value,
        password: form.password.value
    })
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        url: 'http://localhost:3000/login',
        data: data,
        success: function (res) {
            if (res.state === "success") {
                toast({
                    type: "success",
                    message: res.message,
                    duration: 1000,
                });
                setTimeout(() => {
                    window.location.href = './view/panel.html'
                }, 1000);
            }
            else {
                $('#loginLoader').removeClass("spinner-border spinner-border-sm");
                $('#loginLoader').parent().prop("disabled", false);

                form.userName.classList.add("form-control--invalid");
                form.password.classList.add("form-control--invalid");
                form.userName.focus();

                toast({
                    type: "error",
                    message: res.message,
                    duration: 3000,
                });
            }
        },
        fail: function (res) {
            console.log(res);
        }
    });
}

function toast({ type, message, duration }) {
    var toastType = "toast--info";
    var svgPath = "";
    if (type === "error") {
        toastType = "toast--error";
        svgPath = '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>';
    }
    else if (type === "success") {
        toastType = "toast--success";
        svgPath = '<path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>';
    }
    else if (type === "warning") {
        toastType = "toast--warning";
        svgPath = '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>';
    }
    else {
        toastType = "toast--info";
        svgPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>';
    }

    var toast = `
    <div class="toast ${toastType}" role="alert" aria-live="assertive" aria-atomic="true" data-delay="${duration}" data-autohide="false">
        <div class="toast-body d-flex flex-row align-items-center">
            <button type="button" class="ml-2 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h6 class="mb-0">${message}</h6>
            <div class="flex-grow-1"></div>
            <svg class="SvgIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="Warning">${svgPath}</svg>
        </div>
    </div>`;
    $('#toast-here').append(toast);
    $('.toast').toast('show');
    setTimeout(() => {
        $('.toast').remove();
    }, duration);
}