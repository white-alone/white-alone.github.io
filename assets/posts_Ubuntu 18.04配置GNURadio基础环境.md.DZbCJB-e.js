import{_ as a,o as n,c as p,a0 as e}from"./chunks/framework.jwovEGr5.js";const h=JSON.parse('{"title":"Ubuntu 18.04配置GNURadio基础环境","description":"","frontmatter":{"title":"Ubuntu 18.04配置GNURadio基础环境","date":"2019-01-09T10:56:44.000Z","category":"Radio","tags":["无线"]},"headers":[],"relativePath":"posts/Ubuntu 18.04配置GNURadio基础环境.md","filePath":"posts/Ubuntu 18.04配置GNURadio基础环境.md","lastUpdated":1783008259000}'),t={name:"posts/Ubuntu 18.04配置GNURadio基础环境.md"};function i(l,s,c,o,d,r){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>使用GNURadio一般都在Linux下，官方有Ubuntu的<a href="https://www.gnuradio.org/blog/2016-05-28-using-gnu-radio-live-sdr-environment/" target="_blank" rel="noreferrer">LiveCD</a>，Mac下也能兼容，但我一般还是习惯用Ubuntu，当年我的进化路线是<code>Win98SE</code>-<code>WinME</code>-<code>Win2000</code>-<code>WinNT</code>-<code>WinXP</code>-<code>Win2003</code>-<code>RedHat9</code>-<code>Fedora</code>-<code>CentOS</code>-<code>OpenSUSE</code>-<code>Debian</code>-<code>Ubuntu</code>-<code>Arch</code>-<code>Gentoo</code>-<code>LFS</code>-<code>BackTrack</code>-<code>Ubuntu</code>,从赛扬600的松下二手本到P4的Thinkpad G40二手本，一路玩过来，最后还是懒了，基本就在Debian和Ubuntu上打转</p><p>用GNURadio也是从Ubuntu 14.04到16.04，但Unity对GNURadio的界面支持不太好，就像Mac下的X11，丑的难以接受，所以基本都安装Gnome版本的Ubuntu，到了18.04官方终于把默认桌面环境改到Gnome，但一开始用16.04写的脚本安装时候报了一些错，所以整理了下18.04的安装过程</p><hr><h1 id="安装配置ubuntu-18-04系统" tabindex="-1">安装配置Ubuntu 18.04系统 <a class="header-anchor" href="#安装配置ubuntu-18-04系统" aria-label="Permalink to &quot;安装配置Ubuntu 18.04系统&quot;">​</a></h1><hr><p>去官网下载desktop安装镜像安装系统 <a href="https://www.ubuntu.com/download/desktop" target="_blank" rel="noreferrer">https://www.ubuntu.com/download/desktop</a></p><p>安装时候，我一般选择英文系统，安装配置完再设置中文</p><p>安装完成后，设置root密码，安装openssh-server，配置远程登录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$sudo passwd root</span></span>
<span class="line"><span>$su - </span></span>
<span class="line"><span>#apt-get install openssh-server</span></span></code></pre></div><p>之后修改sshd配置文件，将PermitRootLogin的参数prohibit-password改为yes，允许root登录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/ssh/sshd_config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#PermitRootLogin prohibit-password</span></span>
<span class="line"><span>PermitRootLogin yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service ssh restart</span></span></code></pre></div><p>之后就可以用putty、xshell、securecrt等终端软件远程登录操作了</p><p>登录后进行基本配置，我写了个脚本，保存为ub1804_install.sh，然后执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>cat &lt;&lt;EOF</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/ubuntu bionic main restricted universe multiverse</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/ubuntu bionic-security main restricted universe multiverse</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/ubuntu bionic-updates main restricted universe multiverse</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/ubuntu bionic-proposed main restricted universe multiverse</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/ubuntu bionic-backports main restricted universe multiverse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/ubuntu bionic main restricted universe multiverse</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/ubuntu bionic-security main restricted universe multiverse</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/ubuntu bionic-updates main restricted universe multiverse</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/ubuntu bionic-proposed main restricted universe multiverse</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/ubuntu bionic-backports main restricted universe multiverse</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>) &gt; /etc/apt/sources.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get update &amp;&amp; apt-get upgrade &amp;&amp; apt-get -u dist-upgrade</span></span>
<span class="line"><span></span></span>
<span class="line"><span>apt-get install zsh vim openssh-server console-setup rar unrar ntpdate unzip htop screen tmux psmisc bzip2 nload wireless-tools wpasupplicant linux-headers-\`uname -r\` build-essential kernel-package autoconf lzma bc subversion git libncurses5-dev net-tools</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sed -i &#39;s/^PermitRootLogin prohibit-password/PermitRootLogin yes/g&#39; /etc/ssh/sshd_config</span></span>
<span class="line"><span>echo &quot;greeter-show-manual-login=true&quot; &gt;&gt; /usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service ssh restart</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;*/30 *  * * *   /usr/sbin/ntpdate cn.pool.ntp.org&quot; &gt; /etc/cron.d/ntp</span></span>
<span class="line"><span>crontab /etc/cron.d/ntp</span></span>
<span class="line"><span>/etc/init.d/cron restart</span></span>
<span class="line"><span></span></span>
<span class="line"><span>update-alternatives --config editor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dpkg-reconfigure console-setup</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/etc/init.d/console-setup start</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sysv-rc-conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/network/interfaces </span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &gt;&gt; /etc/motd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>cat &lt;&lt;EOF</span></span>
<span class="line"><span># ~/.bashrc: executed by bash(1) for non-login shells.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#PS1=&#39;\\[\\033[01;32m\\]\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\\\$ &#39;</span></span>
<span class="line"><span>PS1=&#39;\\[\\033[01;32m\\]\\h\\[\\033[00m\\]:\\[\\033[01;35m\\]\\w\\[\\033[00m\\]\\\\$ &#39; </span></span>
<span class="line"><span>umask 022</span></span>
<span class="line"><span></span></span>
<span class="line"><span># You may uncomment the following lines if you want &#39;ls&#39; to be colorized:</span></span>
<span class="line"><span>export LS_OPTIONS=&#39;--color=auto&#39;</span></span>
<span class="line"><span>#eval &quot;\\\`dircolors\\\`&quot;</span></span>
<span class="line"><span>alias ls=&#39;ls \\$LS_OPTIONS&#39;</span></span>
<span class="line"><span>alias ll=&#39;ls \\$LS_OPTIONS -l&#39;</span></span>
<span class="line"><span>alias l=&#39;ls \\$LS_OPTIONS -lA&#39;</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Some more alias to avoid making mistakes:</span></span>
<span class="line"><span># alias rm=&#39;rm -i&#39;</span></span>
<span class="line"><span># alias cp=&#39;cp -i&#39;</span></span>
<span class="line"><span># alias mv=&#39;mv -i&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -f /etc/bash_completion ];then</span></span>
<span class="line"><span>        . /etc/bash_completion</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>) &gt; /root/.bash_profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;syntax on&quot; &gt;&gt; /root/.vimrc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/fstab </span></span>
<span class="line"><span></span></span>
<span class="line"><span>rm -rf /etc/grub.d/20_memtest86+</span></span>
<span class="line"><span>sed -i &quot;s/GRUB_TIMEOUT=10/GRUB_TIMEOUT=3/g&quot; /etc/default/grub</span></span>
<span class="line"><span>sed -i &quot;s/GRUB_CMDLINE_LINUX=\\&quot;\\&quot;/GRUB_CMDLINE_LINUX=\\&quot;net.ifnames=0 biosdevname=0\\&quot;/g&quot; /etc/default/grub</span></span>
<span class="line"><span>sed -i &quot;s/#GRUB_DISABLE/GRUB_DISABLE/g&quot; /etc/default/grub</span></span>
<span class="line"><span></span></span>
<span class="line"><span>update-grub2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sed -i &quot;s/timeout=-1/timeout=3/g&quot; /boot/grub/grub.cfg</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sed -i &quot;s/^printf/#printf/g&quot; /etc/update-motd.d/10-help-text</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;Over!&quot;</span></span></code></pre></div><p>通常我会编辑fstab，将id号改为/dev/xxx，这样方便我打包备份、迁移配置好的系统</p><p>另外，安装完成后，不常用的那些游戏、office那些我都会删掉，虽然现在硬盘不值钱，但省一点空间是一点，不要浪费</p><p>最后再在Language中将汉语拖到最上面，将系统设置为中文，注销再登录或者重启后，会提示是否将用户目录下的那些文件夹改为中文名，我通常都是保留旧名称然后不再提醒，毕竟在终端下总切换中文太麻烦</p><p>中文输入法在<code>设置</code>-<code>区域和语言</code>-<code>输入源</code>中添加<code>汉语</code>-<code>Pinyin</code>就可以了</p><hr><h1 id="安装配置常用软件" tabindex="-1">安装配置常用软件 <a class="header-anchor" href="#安装配置常用软件" aria-label="Permalink to &quot;安装配置常用软件&quot;">​</a></h1><hr><p>vnc是很常用的，可以装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget https://www.realvnc.com/download/file/vnc.files/VNC-Server-6.3.2-Linux-x64.deb</span></span>
<span class="line"><span>dpkg -i VNC-Server-6.3.2-Linux-x64.deb</span></span>
<span class="line"><span>vnclicense -add 46262-6H7LB-9SH8M-MK5MV-ASHZA</span></span>
<span class="line"><span>systemctl enable vncserver-x11-serviced.service</span></span>
<span class="line"><span>systemctl start vncserver-x11-serviced.service</span></span></code></pre></div><p>通常我会在vnc先配置下，比如关闭自动更新，登录方式改为将<code>UNIX password</code>改为<code>VNC password</code> 之后再其他机器上用vncviewer连接看一下</p><hr><p>SSR更不用说，有2种安装方式： PlanA 是直接去github下载最新的bin，之后执行即可，注意，最后执行需要在本机图形界面或者vnc图形中执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget https://github.com/shadowsocks/shadowsocks-qt5/releases/download/v3.0.1/Shadowsocks-Qt5-3.0.1-x86_64.AppImage</span></span>
<span class="line"><span>chmod 777  Shadowsocks-Qt5-3.0.1-x86_64.AppImage</span></span>
<span class="line"><span>mv Shadowsocks-Qt5-3.0.1-x86_64.AppImage /usr/local/bin/</span></span>
<span class="line"><span>Shadowsocks-Qt5-3.0.1-x86_64.AppImage &amp;</span></span></code></pre></div><p>PlanB 是apt安装，但作者没有出18.04版本的，但17.10版本是一样可以用的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>add-apt-repository ppa:hzwhuang/ss-qt5</span></span>
<span class="line"><span>sed -i &quot;s/bionic/artful/g&quot; /etc/apt/sources.list.d/hzwhuang-ubuntu-ss-qt5-bionic.list</span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>apt-get install shadowsocks-qt5</span></span></code></pre></div><hr><p>装完SSR我习惯也把SS装上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install shadowsocks-libev</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>cat &lt;&lt;EOF</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;server&quot;:&quot;x.x.x.x&quot;,</span></span>
<span class="line"><span>    &quot;server_port&quot;:&quot;xxx&quot;,</span></span>
<span class="line"><span>    &quot;local_port&quot;:&quot;1080&quot;,</span></span>
<span class="line"><span>    &quot;password&quot;:&quot;xxxxxxxx&quot;,</span></span>
<span class="line"><span>    &quot;timeout&quot;:60,</span></span>
<span class="line"><span>    &quot;method&quot;:&quot;aes-256-cfb&quot;,</span></span>
<span class="line"><span>    &quot;fast_open&quot;:false</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>) &gt; /etc/shadowsocks-libev/config.json </span></span>
<span class="line"><span></span></span>
<span class="line"><span>ss-local -c /etc/shadowsocks-libev/config.json</span></span></code></pre></div><hr><p>再安装几个常用软件，gnome-tweak-tool是gnome的优化配置工具，psensor是温度监测工具，conky是自定义桌面监控工具，当年还写过conky的配置教程，不过已经过时了，以后有空再写个新的~~</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install gnome-tweak-tool psensor conky</span></span></code></pre></div><hr><p>装完SS和SSR，可以再装个sock5协议转换http协议的软件Polipo，但需要依赖dnsmasq，dnsmaq又和系统的systemd-resolved冲突，如果先关了systemd-resolved又没有dns解析，除非手动加配置，太麻烦，所以先安装，无视安装时的报错，再关systemd-resolved，再启动dnsmasq，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install dnsmasq</span></span>
<span class="line"><span>systemctl stop systemd-resolved</span></span>
<span class="line"><span>systemctl disable systemd-resolved</span></span>
<span class="line"><span>systemctl stop dnsmasq</span></span>
<span class="line"><span>systemctl start dnsmasq</span></span></code></pre></div><p>修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi  /etc/NetworkManager/NetworkManager.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[main]</span></span>
<span class="line"><span>dns=dnsmasq</span></span></code></pre></div><p>重启服务，设置关联</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl restart NetworkManager</span></span>
<span class="line"><span>rm -rf /etc/resolv.conf</span></span>
<span class="line"><span>ln -s /var/run/NetworkManager/resolv.conf /etc/resolv.conf</span></span></code></pre></div><p>最后才安装Polipo</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install polipo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>(</span></span>
<span class="line"><span>cat &lt;&lt;EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>socksParentProxy = &quot;127.0.0.1:1080&quot;</span></span>
<span class="line"><span>socksProxyType = socks5</span></span>
<span class="line"><span>proxyAddress = &quot;0.0.0.0&quot; </span></span>
<span class="line"><span>proxyPort = 8123</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>) &gt;&gt; /etc/polipo/config</span></span></code></pre></div><hr><p>相比Firefox，我更喜欢Chrome</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb</span></span>
<span class="line"><span>dpkg -i google-chrome-stable_current_amd64.deb</span></span></code></pre></div><p>避免每次update都报错，除非开了SS或者SSR</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/apt/sources.list.d/google-chrome.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main</span></span></code></pre></div><p>修改数据目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /opt/google/chrome/google-chrome</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在HERE=&quot;\`dirname &quot;$CHROME_WRAPPER&quot;\`&quot;后面添加</span></span>
<span class="line"><span>CHROME_USER_DATA_DIR=&quot;/root/.config/google-chrome&quot;</span></span></code></pre></div><hr><h1 id="安装配置gnu-radio-环境" tabindex="-1">安装配置GNU Radio 环境 <a class="header-anchor" href="#安装配置gnu-radio-环境" aria-label="Permalink to &quot;安装配置GNU Radio 环境&quot;">​</a></h1><hr><p>安装基本依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get -y install git cmake g++ python-dev swig  \\</span></span>
<span class="line"><span>pkg-config libfftw3-dev libboost-all-dev libcppunit-dev libgsl-dev \\</span></span>
<span class="line"><span>libusb-dev libsdl1.2-dev python-wxgtk3.0 python-numpy python-cheetah \\</span></span>
<span class="line"><span>python-lxml doxygen libxi-dev python-sip libqt4-opengl-dev libqwt-dev \\</span></span>
<span class="line"><span>libfontconfig1-dev libxrender-dev python-sip python-sip-dev python-qt4 \\</span></span>
<span class="line"><span>python-sphinx libusb-1.0-0-dev libcomedi-dev libzmq3-dev python-mako \\</span></span>
<span class="line"><span>python-gtk2</span></span></code></pre></div><p>这里我使用pybombs来配置，所以需要还需要安装python-pip</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install python-pip</span></span>
<span class="line"><span>pip install --upgrade pip</span></span></code></pre></div><p>这里可能需要注销或者重启一下，当然也可能不需要，看执行后面的命令会不会报错</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pip install  git+https://github.com/gnuradio/pybombs.git</span></span>
<span class="line"><span>pybombs recipes add gr-recipes git+https://github.com/gnuradio/gr-recipes.git</span></span>
<span class="line"><span>pybombs recipes add gr-etcetera git+https://github.com/gnuradio/gr-etcetera.git</span></span></code></pre></div><p>安装到/usr/local目录，目录下会有.pybombs目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pybombs prefix init /usr/local -a myprefix -R gnuradio-default</span></span></code></pre></div><p>** 这个过程很漫长，需要先下载源码，然后编译，如果电脑性能不够好时间会很长，而且会把CPU跑满，做好散热吧 **</p><p>ubuntu 18.04 默认安装apache-thrift会报错，直接进源码目录手动安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd /usr/local/src/apache-thrift/</span></span>
<span class="line"><span>./configure</span></span>
<span class="line"><span>make -j 8</span></span>
<span class="line"><span>make install</span></span></code></pre></div><p>如果安装出问题，直接安装所需要的组件就行，或者有其他自己想用的组件，都可以这样安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pybombs install osmo-sdr  rtl-sdr gnuradio dump1090 hackrf bladeRF airspy gr-iqbal libosmo-dsp gr-osmosdr armadillo gflags glog gnutls gnss-sdr gqrx</span></span></code></pre></div><p>如果用USRP需要下载image，需要挂代理，不然这个过程非常漫长</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uhd_images_downloader</span></span></code></pre></div><p>安装gr-fosphor出现过问题，所以单独说下，因为这个需要opencl库 如果是intel集显</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install beignet-dev</span></span></code></pre></div><p>如果是nVidia独显</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install nvidia-opencl-dev</span></span></code></pre></div><p>如果是AMD独显，去官网下载安装驱动 <a href="https://www.amd.com/en/support" target="_blank" rel="noreferrer">https://www.amd.com/en/support</a> 然后安装APP SDK，但官网很奇葩，现在居然404了，这里给个链接 <a href="https://github.com/Microsoft/LightGBM/releases/download/v2.0.12/AMD-APP-SDKInstaller-v3.0.130.136-GA-linux64.tar.bz2" target="_blank" rel="noreferrer">https://github.com/Microsoft/LightGBM/releases/download/v2.0.12/AMD-APP-SDKInstaller-v3.0.130.136-GA-linux64.tar.bz2</a> 官方给的解释是直接apt安装opencl-headers就可以了，因为没有amd显卡的机器，我没有实测，哪位如果实测了可以告诉我结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt install opencl-headers</span></span></code></pre></div><p>之后可以安装了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pybombs install gr-fosphor</span></span></code></pre></div><p>如果遇到gqrx无法启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>usermod -a -G pulse-access root</span></span></code></pre></div><p>安装最新audacity和wireshark，建议挂代理，不然下载很慢</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd</span></span>
<span class="line"><span>add-apt-repository ppa:ubuntuhandbook1/audacity</span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>apt-get install audacity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>add-apt-repository ppa:wireshark-dev/stable</span></span>
<span class="line"><span>apt-get update</span></span>
<span class="line"><span>apt-get install wireshark</span></span></code></pre></div><p>安装dspectrum、inspectrum和urh</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd</span></span>
<span class="line"><span>apt-get install ruby</span></span>
<span class="line"><span>git clone https://github.com/jgaeddert/liquid-dsp.git</span></span>
<span class="line"><span>cd liquid-dsp</span></span>
<span class="line"><span>./bootstrap.sh</span></span>
<span class="line"><span>./configure</span></span>
<span class="line"><span>make -j 8</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span>ldconfig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd</span></span>
<span class="line"><span>apt-get install qt5-default libfftw3-dev cmake pkg-config</span></span>
<span class="line"><span>git clone https://github.com/miek/inspectrum.git</span></span>
<span class="line"><span>cd inspectrum</span></span>
<span class="line"><span>mkdir build</span></span>
<span class="line"><span>cd build</span></span>
<span class="line"><span>cmake ..</span></span>
<span class="line"><span>make -j 8</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd</span></span>
<span class="line"><span>git clone https://github.com/tresacton/dspectrum.git</span></span>
<span class="line"><span>cd dspectrum</span></span>
<span class="line"><span>chmod +x ./dspectrum</span></span>
<span class="line"><span>gem install colorize</span></span>
<span class="line"><span>cp ./dspectrum /usr/local/bin/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd</span></span>
<span class="line"><span>ln -s /usr/lib/x86_64-linux-gnu/libLimeSuite.so.17.02.2 /usr/lib/x86_64-linux-gnu/libLimeSuite.so</span></span>
<span class="line"><span>apt-get install python3-numpy python3-psutil python3-zmq python3-pyqt5 g++ libpython3-dev python3-pip cython3</span></span>
<span class="line"><span>git clone https://github.com/jopohl/urh/</span></span>
<span class="line"><span>cd urh</span></span>
<span class="line"><span>pip3 install urh</span></span></code></pre></div><p>好了，基本环境配置完成，其他的按个人喜好自定义吧</p><p>祝大家用得开心~~</p>`,85)])])}const g=a(t,[["render",i]]);export{h as __pageData,g as default};
