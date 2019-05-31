state = str(input("state abrv? "))
name = str(input("state name? "))
deathrate = str(input("rate? "))
rank = str(input("rank? "))
laws = str(input("cat? "))

fact1 = "Firearm deaths per 100,000 people: " + deathrate + " per 100,000 people"
fact2 = "Ranked " + rank + " in the US for highest gun violence"
fact3 = "The regulation of guns in " + name + " is categorised as " + laws

s = "<!DOCTYPE html>" + "\n" + "<h3> " + name + " </h3>" + "\n" + "<ul>" + "\n" + "<li> " + fact1 + " </li>" + "\n" + "<li> " + fact2 + " </li>" + "\n" + "<li> " + fact3 + " </li>"  + "\n" + "</ul>"

file = open(state + ".html", "x")
file.write(s)
