Web Service Primary URL:
https://onlinephotoboothappwebservice.onrender.com

Retrieve all packages:
https://onlinephotoboothappwebservice.onrender.com/allpackages

Add packages:
https://onlinephotoboothappwebservice.onrender.com/addpackages

{
"package_name":"mini fun","description":"Quick photobooth for kids’ parties, simple setup, softcopy only",
"duration_hours":2,"backdrop_type":"cartoon","price":"100.00","props_included":"yes","softcopy_photos":"yes",
"print_photos":"no"
}

Update package:
https://onlinephotoboothappwebservice.onrender.com/updatepackage/id

{
"id":4,"package_name":"premium",
"description":"Includes premium backdrop, props, and unlimited softcopy photos",
"duration_hours":3,"backdrop_type":"premium ","price":"250.00","props_included":"yes",
"softcopy_photos":"yes","print_photos":"yes"
}

 TO

{
"id":4,"package_name":"Deluxe",
"description":"Includes premium backdrop, props, and unlimited softcopy photos",
"duration_hours":3,"backdrop_type":"premium ","price":"250.00","props_included":"yes",
"softcopy_photos":"yes","print_photos":"yes"
}

Delete package using GET:
https://onlinephotoboothappwebservice.onrender.com/deletepackage/id

