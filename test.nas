// Comments should work, dont know why they wouldnt

// labels
#testlabel
// TODO: Fix call label highlighting
call #testlabel

// Special package case insensitivity
if runArg1|=|"" quit
else set {Runarg1} {Playercoords}
set package {playerPY} {Playerpz} {PlayerPx}

// non-lowercase actions highlighted as error
ThisWillError
_sowillthis
.andthis
123alsodoes
// TODO: fix the below. it's meant to error.
// I think it's not error-highlighting because i strip all whitespace from parsing
// Also i need to find a better error highlight than @comment.error
butThisWont.
this.will.not

// TODO: fix not supporting `package|=|`, does bad highlighting, treating the action as though it were a package.
if isorange|=| msg not orange
else msg orange

// using and include have different highlighting
using local_packages
include libs/advlib

// TODO: make set-based things use package highlighting, probably anything starting with "set", including non-existent actions. as any fully lowercase string can be highlighted as an action
set package thing
setactionthatisntreal package thing
setmul package thing
