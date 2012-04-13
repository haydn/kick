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

function className(item)
{
  n = name(item)
  return (n.indexOf(".") == -1) ? n : n.slice(n.lastIndexOf(".")+1);
}

function path(item)
{
  return (item.name.indexOf("/") == -1) ? "" : item.name.slice(0, item.name.lastIndexOf("/"));
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////////////////////////////////////////////

var library = fl.getDocumentDOM().library;
var items = fl.getDocumentDOM().selection;

for (var i=items.length; i--;)
{
  if (items[i].elementType == "instance" && items[i].name == "")
  {
    var newName = className(items[i].libraryItem);

    // Downcase the first letter.
    newName = newName.replace(/^(.)/, function($1) { return $1.toLowerCase(); });

    items[i].name = newName;
  }
}
