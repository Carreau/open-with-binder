# Binderify

Add a "Open in Binder" button in firefox toolbar.

# Install

Head [here](https://addons.mozilla.org/en-US/firefox/addon/open-with-binder/),
click on "Add to Firefox".

Enjoy.

## How to use

 - Install the Firefox extension
 - Click on the button when visiting a GitHub repository.

![](images/example.png)

## Dev install:

Install web-ext
```
$ npm install -g web-ext
```

Run this extension in debug mode in a new firefox process:

```
$ web-ext run 
```

## Release


Set the `VERSION` env varaible.
Run `make release` to automaticaally: 
   - update manifest.json, 
   - commit,
   - tag
   - create a zip archive (you will need to upload). 

You'll need to push the changes and the tag. 

Head to https://chrome.google.com/webstore/devconsole and https://addons.mozilla.org/en-US/firefox/ and follow the procedure to upload new version.
