import{_ as a,o as n,c as o,a0 as p}from"./chunks/framework.jwovEGr5.js";const q=JSON.parse('{"title":"shadowsocks安装与配置","description":"","frontmatter":{"title":"shadowsocks安装与配置","date":"2016-05-13T22:08:10.000Z","category":"Linux","tags":["软件"]},"headers":[],"relativePath":"posts/shadowsocks-an-zhuang-yu-pei-zhi.md","filePath":"posts/shadowsocks-an-zhuang-yu-pei-zhi.md","lastUpdated":1783006593000}'),t={name:"posts/shadowsocks-an-zhuang-yu-pei-zhi.md"};function e(u,s,l,i,c,d){return n(),o("div",null,[...s[0]||(s[0]=[p(`<p>我的VPS选的ub/debian系统</p><p>apt-get install python python-pip</p><p>pip install shadowsocks</p><p>vi /etc/shadowsocks.json</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span> &quot;server&quot;:&quot;my_server_ip&quot;，</span></span>
<span class="line"><span> &quot;local_address&quot;: &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span> &quot;local_port&quot;:3333,</span></span>
<span class="line"><span>  &quot;port_password&quot;: {</span></span>
<span class="line"><span>     &quot;8381&quot;: &quot;foobar1&quot;,</span></span>
<span class="line"><span>     &quot;8382&quot;: &quot;foobar2&quot;,</span></span>
<span class="line"><span>     &quot;8383&quot;: &quot;foobar3&quot;,</span></span>
<span class="line"><span>     &quot;8384&quot;: &quot;foobar4&quot;</span></span>
<span class="line"><span> },</span></span>
<span class="line"><span> &quot;timeout&quot;:300,</span></span>
<span class="line"><span> &quot;method&quot;:&quot;aes-256-cfb&quot;,</span></span>
<span class="line"><span> &quot;fast_open&quot;: false</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>保存配置文件后启动</p><p>开始：ssserver -c /etc/shadowsocks.json -d start 结束：ssserver -c /etc/shadowsocks.json -d stop</p>`,7)])])}const h=a(t,[["render",e]]);export{q as __pageData,h as default};
