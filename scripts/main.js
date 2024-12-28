(function () {
    functions = [
        function loadTime() {
            let loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
            document.getElementById('load_time').innerText = 'Время загрузки страницы: ' + loadTime + ' мс';
        },

        function changeStyle() {
            let location = window.location;
            let navLinks = document.querySelectorAll('.nav-link a');
            
            var res = false
            
            for (var i = 0; i < navLinks.length; i++) {
                let navLink = navLinks[i];

                if (navLink == location.toString()) {
                    res = true;
                    navLink.parentElement.classList.remove('nav-link')
                    navLink.parentElement.classList.add('active-link')
                }
            }
        }
    ]

    for(var i = 0; i < functions.length; i++){
        window.addEventListener('load', functions[i]);
    }

})();

