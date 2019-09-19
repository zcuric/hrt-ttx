<p align="center">
  <a href="#">
    <img src="http://teletekst1.hrt.hr/images/100-01.gif" />
  </a>
</p>

## HRT Teletekst in iTerm2 on MacOS 

Read [HRT teletekst](https://teletekst.hrt.hr) from your `iTerm2` and read the latest [`HINA`](https://www.hina.hr) and other news
without clickbait and ads. [#hejtzaklikbejt](https://www.facebook.com/hejtzaklikbejt)

### Usage 
```
npm install -g hrt-ttx
```
Then
```
hrt-ttx
```
or just
```
npx hrt-ttx
```
### How to read HRT Teletekst 

To use `HRT Teletekst` enter the desired page number in prompt, for example: 101

Enter in prompt `"hrvatska", "svijet", "kultura", "vrijeme", "promet", "sport"` to go to one of these pages.

Enter `exit` to exit or press `ctrl + c`.

Enter `help` to show help.

#### Reading with arrow keys

- Press `right arrow ->` to go to the `next page`
- Press `left arrow <-` to go to `previous page`
- To change sub page press `up arrow`, 
- Press `down arrow` to go to previous sub page.

 Enjoy!


### Know issues

HRT Teletekst uses `gif` images which are corrupted and that causes issues with several `js`
libraries. For that reason other terminals are not supported. 
