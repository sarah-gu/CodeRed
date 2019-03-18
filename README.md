# BlairHacks_3-2019
## Winner of Organizer's Choice Award

Inspiration
The main subject on the radio on our way to Blair Hacks was about the Christchurch mosque shootings in New Zealand. It shocked us that 49 people were killed, but what was even worse was that the entire killing was live streamed for over 17 minutes on Facebook for anyone to see. We see this as a huge problem in today’s society -- social media being the facet for promoting gun violence and exposing the public to the horrors of mass shootings. With the prevalence of social media and increasing gun violence in the world today, we were inspired to create our website Code Red.

What it does
There are five pages to our website. 1) We used Artificial Intelligence and Machine Learning to to identify whether or not an mp3 file has gunshot sounds. 2) Current news articles relating to gun violence are conglomerated on our home page 3) An interactive map that shows the concentrated areas of gun violence and details about each gun related homicide in 2019 4) Firearm death count, state rank for gun violence, and extent of firearm regulation are given for each state 5) An informative test asking about major gun violence incidents for each of the 50 states.

How we built it
For the identification of gunshot sounds in MP3 files, we pass the file through a pre-trained neural network built with Keras and classified it as Yes, the video has gunshot sounds in it and should be flagged for review, or No, the video is safe to post. To demonstrate the algorithm for the hackathon, we created this web page. For the other 4 pages, we utilized bootstrap, css, html and nodejs to create web servers that are interactive and link to databases.

Challenges we ran into
Many of the packages we needed to use were unfamiliar to us, so learning how to correctly use them was a large challenge. In addition, we encountered difficulties with permissions on our files and how our server was displayed.

Accomplishments that we're proud of
We are especially proud that our website is fully functional and can be accessed from anywhere at the link provided below.

What we learned
We learned how to use new packages such as Librosa and bootstrap and also a lot about the statistics on gun violence in the world today.

What's next for #CodeRed
Ideally, we would have social media sites such as Facebook and Twitter utilize our algorithm within their own site to detect gunshots in livestreams and remove the video before it does too much damage as well as notify authorities of a possible crime as soon as possible.
