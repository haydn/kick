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

////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT
////////////////////////////////////////////////////////////////////////////////////////////////////

var library = fl.getDocumentDOM().library;
var items = fl.getDocumentDOM().selection;

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