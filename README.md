# FieldtypeRuntimeMarkup

This module allows for custom markup to be dynamically (PHP) generated and output within a page's edit screen (in Admin).

The value for the fieldtype is generated at runtime. No data is saved in the database. The accompanying InputfieldRuntimeMarkup is only used to render/display the markup in the page edit screen.

The field's value is accessible from the ProcessWire API in the frontend like any other field, i.e. it has access to **$page** and **$pages**.

<img src='https://github.com/kongondo/FieldtypeRuntimeMarkup/raw/master/screenshot1.png' />
<img src='https://github.com/kongondo/FieldtypeRuntimeMarkup/raw/master/screenshot2.png' />


## Install

1. Copy the files for this module to /site/modules/FieldtypeRuntimeMarkup/ OR if running later versions of ProcessWire, install directly from the Modules screen.
2. In admin: Modules > Check for new modules. Install Fieldtype > RuntimeMarkup.
3. Create a new field of type RuntimeMarkup, and name it whatever you want. In our examples we named it "runtime_markup". 
5. Enter your custom PHP code in your field's **Details** tab and save the field. 
6. Your custom PHP code must be **valid** PHP code and must **ONLY return** a ***string or integer***. Anything else (e.g. object or array) will result in an error.
7. Add the field to a template at a desired location. For instance, if you want your markup to be rendered before all other fields when editing a page using that template, you would make sure your RuntimeMarkup field was at the very top of the list of fields in your template.
8. Edit a page using that template to see the returned value. 

## API + Usage

###Backend (Admin-side)

Enter your custom PHP snippet in the **Details** tab of your field. Your code can be as simple or as complicated as you want as long as in the end you return a value that is not an array or an object or anything other than a string/integer.

FieldtypeRuntimeMarkup has access to $page (the current page being edited/viewed) and $pages.

You can use the included but blank **InputfieldRuntimeMarkup.css** file to add styles to customise your rendered markup in the page edit in the admin, i.e. the rendered InputfieldRuntimeMarkup.

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

- Although access to ProcessWire's Fields' admin pages is only available to Superusers, this Fieldtype will evaluate and run the custom PHP code entered and saved in the field's settings (Details tab). Utmost care should therefore be taken in making sure your code does not perform any CRUD operations.
- The value for this fieldtype is generated at runtime and thus no data is stored in the database. This means that you cannot directly query a RuntimeMarkup field from **$pages->find()**.

##Changelog


###Version 0.0.1
Initial Release.

##Resources
 [Support Forum](https://processwire.com/talk/topic/10804-module-runtimemarkup-fieldtype-inputfield/)

##License
GPL(2)


##Credits

This module was sponsored by [Valan](https://processwire.com/talk/user/1193-valan/)