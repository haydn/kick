////////////////////////////////////////////////////////////////////////////////////////////////////
// FUCNTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////

function bitmaplessName(item)
{
  var n = name(item);
  return (n.lastIndexOf("Bitmap") == n.length-6) ? n.slice(0, n.lastIndexOf("Bitmap")) : n;
}

function name(item)
{
  return (item.name.indexOf("/") == -1) ? item.name : item.name.slice(item.name.lastIndexOf("/")+1);
}

function path(item)
{
  return (item.name.indexOf("/") == -1) ? "" : item.name.slice(0, item.name.lastIndexOf("/"));
}

function camelcase(string)
{
  // Captitalise any letter that follows a space or a hyphen.
  string = string.replace(/[\s\-](.)/g, function($1) { return $1.toUpperCase(); });
  // Remove spaces and dashes.
  string = string.replace(/[\s\-]/g, '');
  // Captitalise the first letter.
  string = string.replace(/^(.)/, function($1) { return $1.toUpperCase(); });

  return string;
}

function move(item, namePath)
{
  if (library.itemExists(namePath))
  {
    var i=1;
    while (library.itemExists(namePath+i)) i++;
    item.name = namePath+i;
  }
  else
  {
    item.name = namePath;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////////////////////////////////////////////

var library = fl.getDocumentDOM().library;
var items = fl.getDocumentDOM().selection;

for (var i=items.length; i--;)
{
  if (items[i].elementType == "instance" && items[i].instanceType == "bitmap")
  {
    var item = items[i].libraryItem;
    var newName = name(item);

    // Repalce file extensions ('.png', '.jpg' etc) with 'Bitmap'.
    newName = newName.replace(/\.(png|jpg|gif|jpeg|psd)$/, 'Bitmap');

    if (newName.lastIndexOf("Bitmap") != newName.length-6)
    {
      // If the name doesn't end in "Bitmap", append it.
      newName = newName+"Bitmap";
    }

    // Camelcase it.
    newName = camelcase(newName);

    if (name(item) != newName)
    {
      // Update the actual name.
      move(item, newName);
    }
  }
}

for (var i=items.length; i--;)
{
  if (items[i].elementType == "instance" && items[i].instanceType == "bitmap")
  {
    var newName = bitmaplessName(items[i].libraryItem);
    var newPath = path(items[i].libraryItem);
    var newSymbol;

    fl.getDocumentDOM().selectNone();
    fl.getDocumentDOM().selection = [ items[i] ];

    newSymbol = fl.getDocumentDOM().convertToSymbol("movie clip", newName, "top left");

    library.moveToFolder(newPath, newSymbol.name);
  }
}