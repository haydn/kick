////////////////////////////////////////////////////////////////////////////////////////////////////
// FUCNTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO: Handle mutliple types: is("movie clip", "bitmap")
function is(item, type)
{
  return item.itemType == type;
}

// TODO: Handle mutliple types: isNot("movie clip", "bitmap")
function isNot(item, type)
{
  return item.itemType != type;
}

function name(item)
{
  return (item.name.indexOf("/") == -1) ? item.name : item.name.slice(item.name.lastIndexOf("/")+1);
}

function path(item)
{
  return (item.name.indexOf("/") == -1) ? "" : item.name.slice(0, item.name.lastIndexOf("/")+1);
}

// TODO: Make a move function `move(item, "example/Item")` that will automatically append '00', '01' etc to files with the same name.

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////////////////////////////////////////////

var library = fl.getDocumentDOM().library;
var items = library.items;

// NORMALISE BITMAP NAMES
//
// For example: "my-example-image-a-01.png" => "MyExampleImageABitmap".
//

for (var i=0; i<items.length; i++)
{
  var item = items[i];

  if (is(item, "bitmap"))
  {
    var newName = name(item);

    // Repalce file extensions ('.png', '.jpg' etc) with 'Bitmap'.
    newName = newName.replace(/\.(png|jpg|gif|jpeg|psd)$/, 'Bitmap');
    // Captitalise any letter that follows a space or a hyphen.
    newName = newName.replace(/[\s\-](.)/g, function($1) { return $1.toUpperCase(); });
    // Remove spaces and dashes.
    newName = newName.replace(/[\s\-]/g, '');
    // Strip out all digits.
    newName = newName.replace(/[\d]/g, '');
    // Captitalise the first letter.
    newName = newName.replace(/^(.)/, function($1) { return $1.toUpperCase(); });

    // Update the actual name.
    item.name = newName;
  }
}

// RENAME EXPORTED CLIPS
//
// Move & rename movie clips that have been exported for ActionScript.
//

for (var i=0; i<items.length; i++)
{
  var item = items[i];

  if (is(item, "movie clip"))
  {
    // If the item has been exported for ActionScript.
    if (item.linkageClassName != undefined)
    {
      // If the item isn't already named correctly.
      if (item.linkageClassName != item.name)
      {
        // Move it to the root.
        library.moveToFolder("", item.name);
        // Set it's name to the linkageClassName.
        item.name = item.linkageClassName;
      }
    }
  }
}

// ORGANISE RESOURCES
//
// Move resources into the resources folder.
//

library.newFolder('resources');

for (var i=0; i<items.length; i++)
{
  var item = items[i];

  if (isNot(item, "folder"))
  {
    // If the item hasn't been exported for ActionScript and isn't in the resources folder.
    if (item.linkageClassName == undefined && item.name.indexOf("resources/") != 0)
    {
      // Move it to the resources folder.
      library.moveToFolder("resources", item.name);
    }
  }
}

// TODO: Clean out empty folders.