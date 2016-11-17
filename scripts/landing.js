var animatePoints = function() {
 
                 var points = document.getElementsByClassName('point');
 
                 var revealPoint = function() {
                     points[0].style.opacity = 1;
                     points[0].style.transform = "scaleX(1) translateY(0)";
                     points[0].style.msTransform = "scaleX(1) translateY(0)";
                     points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
                 };
    
                for (var i =0; i < points.length; i++) {
                    revealPoint(i)
                }
 
             };