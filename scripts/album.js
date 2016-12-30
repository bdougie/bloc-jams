// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumBTS = {
     title: 'HYNH',
     artist: 'BTS',
     label: 'EM',
     year: '2015',
     albumArtUrl: 'assets/images/album_covers/18.png',
     songs: [
         { title: 'Hello?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket lala', duration: '3:21'},
         { title: 'Can you hear me now? hi', duration: '3:14' },
         { title: 'Wrong phone number!', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
    '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };


 // #1 set to global scope as to access albumImage variable
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    

var setCurrentAlbum = function(album) {
     // #2 this sets the variables equal to the value listed in the album variables, remember that name.property access value set in that property
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3 clears song list, without calling setCurrentAlbum, song list is not shown as it isn't in album.html
    $albumSongList.empty(); 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

//keeps going upwards while element is true until currentParent matches targetClass. In the case of song-item-number, the child would be the icon.
var findParentByClassName = function(element, targetClass) {
    // set parent
    var currentParent = element.parentElement;
    
    if (currentParent) {
        // Loop to find existing parent or grandparent
        while (currentParent.className && currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
        }
        if (currentParent.className === targetClass) {
            return currentParent;
        } else {
            alert("No parent with that class name found.");
        }
    } else {
        alert("No parent found.");
    }
};

//always return the song-item-number
var getSongItem = function(element) {
    switch (element.className) {
        //child
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        //parent, returns first element in the element with class song-item-number
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        //child of parent
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        //iteself
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};


var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) { 
         //If the clicked song is not the active song, set the content of the new song to the pause button
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
    
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

//play button when in play and in pause
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;


 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     songListContainer.addEventListener('mouseover', function(event) {
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button when it is not currentplayingsong
             var songItem = getSongItem(event.target);
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }   
         }
     });
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // #1 cached the song item that we're leaving in a variable
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2 the conditional that checks that the item the mouse is leaving is not the current song
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
             
         });
         
         songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
     }
     
     var album = [albumPicasso, albumMarconi, albumBTS];
     var index = 1;
     albumImage.addEventListener("click", function(event){
        setCurrentAlbum(album[index]);
        index++;
     if (index == album.length) {
         index = 0;
     }
        });
 }