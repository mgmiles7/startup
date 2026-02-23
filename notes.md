# CS 260 Notes

## Git & Github
### Git
**Command Line**
- `git init` initializes git functionality for the current directory
- `git status` lists the git info for the files in the directory
- `git add` when followed by files stages those files to be committed
      - `git add .` adds everything in the current directory
- `git commit -m` commits the staged files to the branch with a commit message following in " "
      - `git commit -am` adds everything and commits them
- `git diff HEAD HEAD~` compares the current commit to earlier commits

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [MD Cheatsheet](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## AWS

I learned a lot about AWS and how the internet works, communicating through different clients and servers. I was able to set up a web server through AWS EC2 service. I learned how IP addresses are used to identify computers and how the internet serves to dynamically connect those computers. I learned how domain names were tied to IP addresses to make it easier for humans to interact with the internet. I learned how to create an elastic IP address so that my IP address will remain constant even when I restart my server. I also learned about web certificates are issued and are part of the HTTPS protocol

I initially had trouble connecting to my server, but then I realized that I was trying to connect over HTTPS when it hadn't been set up yet

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I learned a little bit about HTML but honestly a lot more about basic CSS as I was creating the deliverable. Most of what I explored came from understanding how flex and grid containers worked. I ended up going with flexbox for most of the pages. With the flexbox I also added the ability for certain elements, like the messages and the timeline to scroll, without the rest of the page scrolling as well. I learned about how flexboxes will try to fill their space unless you tell them not too and how grid can be useful for setting up a webpages overall structure. 

The actual HTML wasn't very difficult as I had used HTML a fair bit before. Just made sure that I used all the semantic elements correctly to give the page good structure. 

## CSS

To link a CSS file to your HTML, you need to usef a `link` element in the `head` element of the HTML

Change the property `box-sizing` to `border-box` to define width and heighth to include pading and border

## React Part 1: Routing

Setting up Vite and React was pretty simple.

I had a hard time figuring out how to route some of the components using a nested structure with my login page and then my app pages. 

I learned that I could only have one browser router component so I moved that into the app.jsx file. Using navlinks were a bit of a pain but I figured out how to get from my login page to my chat page which was the head page for the rest of the app

The only other problem I had was that I wrote my CSS in a somewhat sloppy way the first time so I had to do a fair bit of restructuring there to get all of my styles to load correctly in the routed form. I also had to use the debugger to figure out which styles were being overwritten. 

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
