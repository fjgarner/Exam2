function MenuChoice()
{
    if(document.getElementById("Menu").value == "Display the category list")
    {
        document.getElementById("discat").style.visibility = "visible";
        document.getElementById("addprod").style.visibility = "hidden";
        document.getElementById("chgdesc").style.visibility = "hidden";
        document.getElementById("delcat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
        document.getElementById("discat").style.display = "block";
        document.getElementById("addprod").style.display = "none";
        document.getElementById("chgdesc").style.display = "none";
        document.getElementById("delcat").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Add a product category")
    {
        document.getElementById("discat").style.visibility = "hidden";
        document.getElementById("addprod").style.visibility = "visible";
        document.getElementById("chgdesc").style.visibility = "hidden";
        document.getElementById("delcat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
        document.getElementById("discat").style.display = "none";
        document.getElementById("addprod").style.display = "block";
        document.getElementById("chgdesc").style.display = "none";
        document.getElementById("delcat").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
    else if(document.getElementById("Menu").value == "Change the description for a category")
    {
        document.getElementById("discat").style.visibility = "hidden";
        document.getElementById("addprod").style.visibility = "hidden";
        document.getElementById("chgdesc").style.visibility = "visible";
        document.getElementById("delcat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
        document.getElementById("discat").style.display = "none";
        document.getElementById("addprod").style.display = "none";
        document.getElementById("chgdesc").style.display = "block";
        document.getElementById("delcat").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
      else if(document.getElementById("Menu").value == "Delete a category from the database")
    {
        document.getElementById("discat").style.visibility = "hidden";
        document.getElementById("addprod").style.visibility = "hidden";
        document.getElementById("chgdesc").style.visibility = "hidden";
        document.getElementById("delcat").style.visibility = "visible";
        document.getElementById("about").style.visibility = "hidden";
        document.getElementById("discat").style.display = "none";
        document.getElementById("addprod").style.display = "none";
        document.getElementById("chgdesc").style.display = "none";
        document.getElementById("delcat").style.display = "block";
        document.getElementById("about").style.display = "none";
    }
      else if(document.getElementById("Menu").value == "Display about area")
    {
        document.getElementById("discat").style.visibility = "hidden";
        document.getElementById("addprod").style.visibility = "hidden";
        document.getElementById("chgdesc").style.visibility = "hidden";
        document.getElementById("delcat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "visible";
        document.getElementById("discat").style.display = "none";
        document.getElementById("addprod").style.display = "none";
        document.getElementById("chgdesc").style.display = "none";
        document.getElementById("delcat").style.display = "none";
        document.getElementById("about").style.display = "block";
    }
   else
    {
        document.getElementById("discat").style.visibility = "hidden";
        document.getElementById("addprod").style.visibility = "hidden";
        document.getElementById("chgdesc").style.visibility = "hidden";
        document.getElementById("delcat").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "hidden";
        document.getElementById("discat").style.display = "none";
        document.getElementById("addprod").style.display = "none";
        document.getElementById("chgdesc").style.display = "none";
        document.getElementById("delcat").style.display = "none";
        document.getElementById("about").style.display = "none";
    }
}

function GetCatList()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    
    objRequest.open("GET",url,true);
    objRequest.send();
}

function GenerateOutput(result)
{
    var count = 0;
    var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for(count=0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("catlistdis").innerHTML = displaytext;
}

function AddProdCat()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var catname = document.getElementById("catname").value;
    var catdes = document.getElementById("catdes").value;
    
    var newcategory = '{"CName":"' + catname + '","CDescription":"' + catdes + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput1(output);
        }
    }
    
    objRequest.open("POST",url,true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function GenerateOutput1(result)
{
      if (result.WasSuccessful == 1)
    {
        document.getElementById("prodcat").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("prodcat").innerHTML = "The operation was not successful" + "<br>" + result.Exception;
    }
}

function ChgCatDesc()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var catid = document.getElementById("catid").value;
    var newdesc = document.getElementById("newdesc").value;
    
    var newcatdesc = '{"CID":' + catid + ',"CDescription":"' + newdesc + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput2(output);
        }
    }
    
    objRequest.open("POST",url,true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcatdesc);
}

function GenerateOutput2(result)
{
    if (result.WasSuccessful == 1)
    {
        document.getElementById("chgdescres").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("chgdescres").innerHTML = "The operation was not successful" + "<br>" + result.Exception;
    }
}

function DelCat()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("dcatid").value;
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            GenerateOutput3(result);
        }
    }
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GenerateOutput3(result)
{
       if (result.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("delcatres").innerHTML = "The operation was successful";
    }
    else
    {
        document.getElementById("delcatres").innerHTML = "The operation was not successful" + "<br>" + result.Exception;
    }
}
