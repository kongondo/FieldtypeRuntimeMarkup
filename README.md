# FieldtypeRuntimeMarkup

This module allows for custom markup to be dynamically (PHP) generated and output within a page's edit screen (in Admin). Optionally, JavaScript and CSS files can be added to target the output markup (or any other markup on the page).

The value for the Fieldtype is generated at runtime. No data is saved in the database. The accompanying InputfieldRuntimeMarkup is only used to render/display the markup in the page edit screen.

The field's value is accessible from the ProcessWire API in the frontend like any other field, i.e. it has access to **$page** and **$pages**.

##Screenshots

###Backend
<img src='https://github.com/kongondo/FieldtypeRuntimeMarkup/raw/master/screenshot1.png' />
<img src='https://github.com/kongondo/FieldtypeRuntimeMarkup/raw/master/screenshot2.png' />


###Frontend
<img src='https://github.com/kongondo/FieldtypeRuntimeMarkup/raw/master/screenshot3.png' />

## Install

1. Copy the files for this module to /site/modules/FieldtypeRuntimeMarkup/ OR if running later versions of ProcessWire, install directly from the Modules screen.
2. In admin: Modules > Check for new modules. Install Fieldtype > RuntimeMarkup.
3. Create a new field of type RuntimeMarkup, and name it whatever you want. In our examples, we named it "runtime_markup". 
4. Head over to your field's **Details** tab.
5. Complete the how to specify your PHP code option. **It is recommended to use the Render PHP files option**. Otherwise, enter your custom PHP code in the PHP code textarea.
6. If rendering PHP files, fill in the settings for rendering PHP files. It is possible to render only 1 PHP file if it has an identical name to your field. **If you wish to render more than one PHP file and/or your file has a different name to your field**, select that option and enter comma-separated names/paths of those PHP files. Do the same for the JavaScript and CSS files sections if you wish to add scripts and style files. Please note that **these JavaScript and CSS files can also specified if you are using the paste PHP code option**.
7. You will also need to specify your files' root path. Only **/site/templates/** and **/site/modules/** are allowed. Your specified files will need to descend from the specified root. It is OK for them to be in sub-folders. If that is the case, enter the relative path, for example *includes/my-file, my-file.inc*, etc.
8. Please note that **.php**, **.js** and **.css** extensions are assumed for respective file types, so do not need to be entered.
9. If you chose to paste custom PHP code, this must be **valid** PHP code and must **ONLY return** a ***string or integer***. Anything else (e.g. object or array) will result in an error.

When done, add the field to a template at a desired location. For instance, if you want your markup to be rendered before all other fields when editing a page using that template, you would make sure your RuntimeMarkup field was at the very top of the list of fields in your template. Edit a page using that template to see the returned value. If errors are found, these will be displayed.

## API + Usage

### Backend (Admin-side)

#### Render PHP File(s)

**This is the recommended way to use this Fieldtype**. Using this option, you will be able to easily edit your PHP file(s) in the comfort of your favourite code editor. The PHP file will be rendered using ProcessWire's [wireRenderFile()](http://processwire.com/blog/posts/processwire-2.5.2/#new-wirerenderfile-and-wireincludefile-functions) method. The Fieldtype will pass **$page** and **$pages** variables to the rendered file, hence you will be able to use those as normal in the PHP file being rendered.

A $page example.


```php
echo $page->title;// will echo the title of the page being edited

```

A $pages->find() example.

```php
$articles = $pages->find('template=articles, limit=5');

$out = '<ol class="articles">';
foreach ($articles as $article) $out .= '<li>' . $article->title . '</li>';
$out .= '</ol>';

echo $out;

```

Of course, you will want to do something more meaningful. For instance, find pages which have a certain field empty. Loop through the pages create modal links to them. You will then be able to edit those pages in a modal window. In addition, you can target the unordered list using its CSS class in your JavaScript and/or CSS. 

This is only one example. You can be as complex or imaginative as you want with this Fieldtype!


#### Paste PHP Code Option

If using the paste PHP code option, enter your custom PHP snippet in the **Details** tab of your field. Your code can be as simple or as complicated as you want as long as in the end you return a value that is not an array or an object or anything other than a string/integer.

FieldtypeRuntimeMarkup has access to $page (the current page being edited/viewed) and $pages.

A very simple example.

```php
return 'Hello';

```

Simple example.

```php
return $page->title;

```

Simple example with markup.

```php
return '<h2>' . $page->title . '</h2>';

```

Another simple example with markup.

```php
$out = '<h1>hello ';
$out .= $page->title;
$out .= '</h1>';
return $out;

```

A more advanced example.

```php
$p = $pages->get('/about-us/')->child('sort=random');
return '<p>' . $p->title . '</p>';

```

An even more complex example.

```php
$str ='';
if($page->name == 'about-us') {
  $p = $page->children->last();
  $str = "<h2><a href='{$p->url}'>{$p->title}</a></h2>";
}

else {
  $str = "<h2><a href='{$page->url}'>{$page->title}</a></h2>";
}

return $str;

```

## JavaScript and CSS

You can optionally use JavaScript and CSS files by specifying these in the field's settings. If you wish, you can also use the included but blank **InputfieldRuntimeMarkup.css** and **InputfieldRuntimeMarkup.js** files to add styles and scripts respectively to customise your rendered markup in the page edit in the admin, i.e. the rendered InputfieldRuntimeMarkup. This is not recommended though as those files will be overwritten when you update the module.

###How to access the value of RuntimeMarkup in the frontend

Access the field on this page like any other field.

```php
echo $page->runtime_markup;

```

Access the field on another page like any other field.

```php
echo $pages->get('/about-us/')->runtime_markup;

```

##Warnings and Considerations

- Although access to ProcessWire's Fields' admin pages is only available to Superusers, if you use the pasted PHP option, this Fieldtype will evaluate and run the custom PHP code entered and saved in the field's settings (Details tab). Utmost care should therefore be taken in making sure your code does not perform any CRUD operations (unless of course that's intentional). The same is true if using the render PHP file option.
- The value for this Fieldtype is generated at runtime and thus no data is stored in the database. This means that you cannot directly query a RuntimeMarkup field from **$pages->find()**.

## Changelog

### Version 0.0.3
Added support for rendering PHP, CSS and JavaScript files.

### Version 0.0.2
Added markupValue() method for correctly rendering markup output in listers.

### Version 0.0.1
Initial Release.

## Resources
 [Support Forum](https://processwire.com/talk/topic/10804-module-runtimemarkup-fieldtype-inputfield/)

## License
GPL(2)


## Credits

This module was sponsored by [Andrey Valiev](https://processwire.com/talk/user/1193-valan/)