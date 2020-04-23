# Image Gallery

## Intro

Imagine that you are involved in the development of a large file storage system. Special feature here is storing photos and images. We need to provide our users with the possibility to view stored images from a web interface.  

## Requirements

1. We need to see your own code.  
2. The app should load and display photos from our API endpoint `http://interview.agileengine.com`  
3. Obtain a valid Bearer token with valid API key (don't forget to implement invalid token handler and renewal)  

    >POST `http://interview.agileengine.com/auth`
    >Body: { "apiKey": "23567b218376f79d9415" }  
    >Response: { "token": "ce09287c97bf310284be3c97619158cfed026004" }  

4. The app should fetch paginated photo feed in JSON format with the following REST API call (GET):  

    >GET `/images`  
    >Headers: Authorization: Bearer ce09287c97bf310284be3c97619158cfed026004  

Following pages can be retrieved by appending ‘page=N’ parameter:  

    >GET /images?page=2

No redundant REST API calls should be triggered by the app.  
5. The app should fetch more photo details (photographer name, better resolution) by the following REST API call (GET):

    >GET `/images/${id}`

6.We value code readability and consistency, and usage of modern community best practices and architectural approaches, as well, as functionality correctness. So pay attention to code quality.  
7. Target completion time is about 2 hours. We would rather see what you were able to do in 2 hours than a full-blown algorithm you’ve spent days implementing. Note that in addition to quality, time used is also factored into scoring the task.

## UI/UX Requirements

1. The app should contain two screens
2. Grid view:
    - Displays photos in a flexible grid, number of columns depending on the width of the viewport.
    - When a user clicks on a grid cell open up the Photo View.
    - (optional) Avoid image flickering on scroll.
3. Photo view:
    - Displays a fullscreen photo in a closable popup.
    - Shows author name, camera model and hashtags as an overlay.
    - Allows sharing a photo URL via a floating action button.
    - Support zooming and panning for images.
    - Supports navigating between images (left/right)
    - (optional) Animated screen transitions would be a plus.

## Expected Deliverables

1. Source code.
2. Readme, with instructions, how to build and run.

## Solution

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
