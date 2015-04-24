#jQuery-Form-Abandonment.js

jQuery-Form-Abandonment is a simple jQuery plugin that makes tracking form engagement and abandonment a breeze.

This project is in its early stages, but already gets the job done.

Current version: 0.1.0.

###Requirements:

* jQuery previously loaded in the page.  Confirmed working 1.10 and 2.1.1.
* Google Analytics Universal Web Tracking, aka Universal Analytics.  Universal Analytics has been out since March 2013, so if you're using GA you're probably using it.  Events are handled differently with the older versions. If adding support for the older versions is something you'd like, open an issue on GitHub to let me know.

So, you need to have the GA snippet which looks something like:

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-XXXXX-X', 'auto');
    ga('send', 'pageview');

### Installation

Download jquery.form-abandonment.js and load it in a script tag AFTER jQuery has been loaded.

### Usage

The plugin must be called on a \<form> element.  Find the form you want, and then call:

    $('form').trackAbandonment();

That's all you need to do.  Custom events will be sent to the Google Analytics for that site.  Custom events will tell you:

1. If users are filling out forms on that page, or leaving them untouched.
2. Whether the form has been submitted.
3. What fields they've filled out when the form is submitted.

#### Options

The options correspond to the identifying strings sent up with the custom events to Google Analytics.  Change these if you want to categorize events different.

    {
        abandonmentCateogry: 'abandonment',
        abandonmentAction: 'abandonedForm',
        abandonedLabel: 'Left form unchanged',
        notAbandonedLabel : 'Filled out form',
        submitCategory : 'form',
        submitAction: 'submit',
        //there is no submit label, because the label are the fields in the form modified
    };

### Viewing the Data

The data is all sent up to the Google Analytics account.

There are two places to view the data: Real-time > Events, and Behaviour > Events.  

Events show up in real-time right away.  I recommend opening this page up while testing the setup of the plugin.  It takes some time for events to show up in the behaviour page, but the information there will be more detailed.


