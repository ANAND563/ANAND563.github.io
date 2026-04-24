$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for nav links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // Typed.js initialization
    if ($('.typed').length) {
        var typed_strings = $(".typed").data('typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    // AOS (Animate On Scroll) initialization
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Skills Carousel
    $(".skills-carousel").owlCarousel({
        loop: true,
        margin: 0, // Using padding on .item in CSS for better control
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: { 
                items: 1,
                stagePadding: 0
            },
            768: { 
                items: 2
            },
            1100: { 
                items: 4
            }
        }
    });

    // AJAX Form Submission for Formspree
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var action = form.attr('action');
        var button = form.find('button[type="submit"]');
        
        // Disable button during submission
        button.prop('disabled', true).text('Sending...');

        $.ajax({
            url: action,
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                // Show Success Toast
                $('#successToast').addClass('show');
                setTimeout(function() {
                    $('#successToast').removeClass('show');
                }, 4000);

                form[0].reset(); // Clear the form
                button.prop('disabled', false).text('Send Message');
            },
            error: function(err) {
                alert('Oops! There was an error. Please try again later.');
                button.prop('disabled', false).text('Send Message');
            }
        });
    });
});
