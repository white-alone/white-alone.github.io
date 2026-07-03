import{_ as n,o as a,c as p,af as e}from"./chunks/framework.BvYvR_Rg.js";const h=JSON.parse('{"title":"NAS架构之Debian 8","description":"","frontmatter":{"title":"NAS架构之Debian 8","date":"2016-06-11T00:13:33.000Z","category":"Linux","tags":["Linux","Debian","NAS"]},"headers":[],"relativePath":"posts/NAS架构之Debian 8.md","filePath":"posts/NAS架构之Debian 8.md","lastUpdated":1783008259000}'),t={name:"posts/NAS架构之Debian 8.md"};function l(i,s,o,c,r,d){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>虽然可以买群晖，也能DIY黑群晖，虽然有FreeNAS，但我还是更喜欢用Debian/Ubuntu系统构建自己的NAS，轻量、稳定。</p><hr><h1 id="安装debian-8系统" tabindex="-1">安装Debian 8系统 <a class="header-anchor" href="#安装debian-8系统" aria-label="Permalink to &quot;安装Debian 8系统&quot;">​</a></h1><hr><p>安装的时候选择源 选择最上面的 手动输入163源的host名mirrors.ustc.edu.cn，目录默认即可。</p><p>如果是安装之后，添加源：</p><p><strong>vi /etc/apt/sources.list</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>deb http://mirrors.ustc.edu.cn/mirrors/debian jessie main non-free contrib</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/mirrors/debian jessie-updates main non-free contrib</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/mirrors/debian jessie-backports main non-free contrib</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/mirrors/debian jessie-proposed-updates main contrib non-free</span></span>
<span class="line"><span>deb http://mirrors.ustc.edu.cn/mirrors/debian-security jessie/updates main contrib non-free</span></span>
<span class="line"><span></span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/mirrors/debian jessie main non-free contrib</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/mirrors/debian jessie-updates main non-free contrib</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/mirrors/debian jessie-backports main non-free contrib</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/mirrors/debian jessie-proposed-updates main contrib non-free</span></span>
<span class="line"><span>deb-src http://mirrors.ustc.edu.cn/mirrors/debian-security jessie/updates main contrib non-free</span></span></code></pre></div><p><strong>dpkg-reconfigure locales</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>选中en_US.UTF-8/zh_CN.GB2312/zh_CN.UTF-8/zh_CN.GB18030/zh_CN.GBK</span></span>
<span class="line"><span>默认选en_US.UTF-8</span></span></code></pre></div><p><strong>apt-get update &amp;&amp; apt-get upgrade</strong></p><p><strong>apt-get install vsftpd apache2 vim ntfs-3g samba console-setup sysv-rc-conf git subversion rar unrar unzip ntpdate psmisc htop exfat-utils screen tmux bzip2 nload nethogs wireless-tools wpasupplicant nfs-common nfs-kernel-server rsync db5.3</strong></p><p><strong>dpkg-reconfigure console-setup</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>UTF-8</span></span>
<span class="line"><span>Combined - Latin; Slavic Cyrillic; Hebrew; basic Arabic</span></span>
<span class="line"><span>VGA</span></span>
<span class="line"><span>8x16</span></span></code></pre></div><p><strong>/etc/init.d/console-setup start</strong></p><p><strong>sysv-rc-conf</strong></p><p>关闭一些服务，基本留<code>ssh</code>就行了，如果是图形界面，就还需要留<code>light-dm</code></p><p>配置网卡<code>IP</code>，如果不是<code>dhcp</code>记得在<code>/etc/resolv.conf</code>添加<code>nameserver</code>，也就是DNS解析服务器</p><p><strong>vi /etc/network/interfaces</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auto lo</span></span>
<span class="line"><span>iface lo inet loopback</span></span>
<span class="line"><span></span></span>
<span class="line"><span># The primary network interface</span></span>
<span class="line"><span>allow-hotplug eth0</span></span>
<span class="line"><span>allow-hotplug eth2</span></span>
<span class="line"><span>iface eth0 inet static</span></span>
<span class="line"><span>address 192.168.20.32</span></span>
<span class="line"><span>netmask 255.255.255.0</span></span>
<span class="line"><span>gateway 192.168.20.254</span></span>
<span class="line"><span>iface eth2 inet dhcp</span></span></code></pre></div><hr><h1 id="ftp配置" tabindex="-1">FTP配置 <a class="header-anchor" href="#ftp配置" aria-label="Permalink to &quot;FTP配置&quot;">​</a></h1><hr><h2 id="ftp多用户配置" tabindex="-1">FTP多用户配置 <a class="header-anchor" href="#ftp多用户配置" aria-label="Permalink to &quot;FTP多用户配置&quot;">​</a></h2><hr><p><strong>cp /etc/vsftpd.conf /etc/vsftpd.conf.bak</strong></p><p><strong>vi /etc/vsftpd.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>listen=YES</span></span>
<span class="line"><span>use_localtime=YES</span></span>
<span class="line"><span>listen_port=21</span></span>
<span class="line"><span>anonymous_enable=NO</span></span>
<span class="line"><span>local_enable=YES</span></span>
<span class="line"><span>write_enable=NO</span></span>
<span class="line"><span>local_umask=022</span></span>
<span class="line"><span>anon_upload_enable=NO</span></span>
<span class="line"><span>anon_mkdir_write_enable=NO</span></span>
<span class="line"><span>dirmessage_enable=YES</span></span>
<span class="line"><span>xferlog_enable=YES</span></span>
<span class="line"><span>connect_from_port_20=YES</span></span>
<span class="line"><span>chown_uploads=NO</span></span>
<span class="line"><span>xferlog_file=/var/log/vsftpd.log</span></span>
<span class="line"><span>xferlog_std_format=YES</span></span>
<span class="line"><span>async_abor_enable=YES</span></span>
<span class="line"><span>ascii_upload_enable=YES</span></span>
<span class="line"><span>ascii_download_enable=YES</span></span>
<span class="line"><span>ftpd_banner=Welcome to White FTP servers</span></span>
<span class="line"><span>chroot_local_user=NO</span></span>
<span class="line"><span>chroot_list_enable=YES</span></span>
<span class="line"><span>chroot_list_file=/etc/vsftpd.chroot_list</span></span>
<span class="line"><span>pam_service_name=vsftpd</span></span>
<span class="line"><span>userlist_enable=NO</span></span>
<span class="line"><span>tcp_wrappers=YES</span></span>
<span class="line"><span>idle_session_timeout=300</span></span>
<span class="line"><span>data_connection_timeout=1</span></span>
<span class="line"><span>guest_enable=YES</span></span>
<span class="line"><span>guest_username=vftp</span></span>
<span class="line"><span>user_config_dir=/etc/vsftpd/vconf</span></span>
<span class="line"><span>virtual_use_local_privs=YES</span></span>
<span class="line"><span>pasv_min_port=9000</span></span>
<span class="line"><span>pasv_max_port=9045</span></span>
<span class="line"><span>accept_timeout=5</span></span>
<span class="line"><span>connect_timeout=1</span></span></code></pre></div><p>锁定用户主目录的名单 <strong>vi /etc/vsftpd.chroot_list</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test</span></span></code></pre></div><p><strong>mkdir /etc/vsftpd cd /etc/vsftpd vi login.txt</strong></p><p>添加帐号密码，奇数行为帐号 偶数行为密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>test</span></span>
<span class="line"><span>white</span></span></code></pre></div><p><strong>db5.3_load -T -t hash -f /etc/vsftpd/login.txt /etc/vsftpd/vsftpd_login.db chmod 600 /etc/vsftpd/vsftpd_login.db vi /etc/pam.d/vsftpd</strong></p><p>在最前面添加</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auth required /lib/i386-linux-gnu/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login</span></span>
<span class="line"><span>account required /lib/i386-linux-gnu/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login</span></span></code></pre></div><p>如果是64位系统</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auth required /lib/x86_64-linux-gnu/security/pam_userdb.so=/etc/vsftpd/vsftpd_login</span></span>
<span class="line"><span>account required /lib/x86_64-linux-gnu/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login</span></span></code></pre></div><p>其他的注释掉</p><p><strong>useradd -d /Disk/FTP -s /usr/sbin/nologin vftp chmod -R 555 /Disk/FTP chown -R vftp:vftp /Disk/FTP</strong></p><p>设定某目录可写 <strong>chmod -R 757 /Disk/FTP/Up touch /var/log/vsftpd.log chown vftp:vftp /var/log/vsftpd.log<br> mkdir /etc/vsftpd/vconf</strong></p><p>配置用户权限 <strong>vi /etc/vsftpd/vconf/test</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>local_root=/Disk/FTP</span></span>
<span class="line"><span>write_enable=Yes</span></span>
<span class="line"><span>anon_world_readable_only=NO</span></span>
<span class="line"><span>anon_upload_enable=NO</span></span>
<span class="line"><span>anon_mkdir_write_enable=NO</span></span>
<span class="line"><span>anon_other_write_enable=NO</span></span></code></pre></div><p>配置完成启动服务 <strong>/etc/init.d/vsftpd restart</strong></p><hr><h2 id="ftp单root用户配置" tabindex="-1">FTP单root用户配置 <a class="header-anchor" href="#ftp单root用户配置" aria-label="Permalink to &quot;FTP单root用户配置&quot;">​</a></h2><hr><p><strong>mkdir /etc/vsftpd echo root &gt; /etc/vsftpd/user_list sed -i &quot;s/root/#root/g&quot; /etc/ftpusers vi /etc/vsftpd.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>listen=YES</span></span>
<span class="line"><span>listen_ipv6=NO</span></span>
<span class="line"><span>listen_port=2122</span></span>
<span class="line"><span>anonymous_enable=NO</span></span>
<span class="line"><span>local_enable=YES</span></span>
<span class="line"><span>write_enable=YES</span></span>
<span class="line"><span>local_umask=022</span></span>
<span class="line"><span>dirmessage_enable=YES</span></span>
<span class="line"><span>use_localtime=YES</span></span>
<span class="line"><span>xferlog_enable=YES</span></span>
<span class="line"><span>#connect_from_port_20=YES</span></span>
<span class="line"><span>chown_uploads=YES</span></span>
<span class="line"><span>chown_username=root</span></span>
<span class="line"><span>local_root=/NetDisk</span></span>
<span class="line"><span>xferlog_file=/var/log/vsftpd.log</span></span>
<span class="line"><span>xferlog_std_format=YES</span></span>
<span class="line"><span>idle_session_timeout=600</span></span>
<span class="line"><span>data_connection_timeout=120</span></span>
<span class="line"><span>#nopriv_user=ftpsecure</span></span>
<span class="line"><span>#async_abor_enable=YES</span></span>
<span class="line"><span>ascii_upload_enable=YES</span></span>
<span class="line"><span>ascii_download_enable=YES</span></span>
<span class="line"><span>#chroot_local_user=YES</span></span>
<span class="line"><span>#chroot_local_user=YES</span></span>
<span class="line"><span>#chroot_list_enable=YES</span></span>
<span class="line"><span>#chroot_list_file=/etc/vsftpd.chroot_list</span></span>
<span class="line"><span>#ls_recurse_enable=YES</span></span>
<span class="line"><span>secure_chroot_dir=/var/run/vsftpd/empty</span></span>
<span class="line"><span>pam_service_name=vsftpd</span></span>
<span class="line"><span>userlist_enable=YES</span></span>
<span class="line"><span>userlist_deny=NO</span></span>
<span class="line"><span>userlist_file=/etc/vsftpd/user_list</span></span>
<span class="line"><span>rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem</span></span>
<span class="line"><span>rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key</span></span>
<span class="line"><span>ssl_enable=NO</span></span>
<span class="line"><span>ftpd_banner=Welcom to NAS Server</span></span></code></pre></div><p>配置完成启动服务 <strong>/etc/init.d/vsftpd restart</strong></p><hr><h1 id="web服务" tabindex="-1">Web服务 <a class="header-anchor" href="#web服务" aria-label="Permalink to &quot;Web服务&quot;">​</a></h1><hr><h2 id="apache2" tabindex="-1">Apache2 <a class="header-anchor" href="#apache2" aria-label="Permalink to &quot;Apache2&quot;">​</a></h2><hr><p><strong>cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf.bak cp /etc/apache2/apache2.conf /etc/apache2/apache2.conf.bak vi /etc/apache2/apache2.conf</strong></p><p>删除</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;Directory /&gt;</span></span>
<span class="line"><span>        Options FollowSymLinks</span></span>
<span class="line"><span>        AllowOverride None</span></span>
<span class="line"><span>        Require all denied</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Directory /usr/share&gt;</span></span>
<span class="line"><span>        AllowOverride None</span></span>
<span class="line"><span>        Require all granted</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Directory /var/www/&gt;</span></span>
<span class="line"><span>        Options Indexes FollowSymLinks</span></span>
<span class="line"><span>        AllowOverride None</span></span>
<span class="line"><span>        Require all granted</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span></code></pre></div><p><strong>vi /etc/apache2/sites-available/000-default.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;VirtualHost *:80&gt;</span></span>
<span class="line"><span>        ServerAdmin webmaster@localhost</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        DocumentRoot /web</span></span>
<span class="line"><span>        &lt;Directory /&gt;</span></span>
<span class="line"><span>                Options FollowSymLinks</span></span>
<span class="line"><span>                AllowOverride None</span></span>
<span class="line"><span>        &lt;/Directory&gt;</span></span>
<span class="line"><span>        &lt;Directory /web/&gt;</span></span>
<span class="line"><span>                Options Indexes FollowSymLinks MultiViews</span></span>
<span class="line"><span>                AllowOverride None</span></span>
<span class="line"><span>                Order allow,deny</span></span>
<span class="line"><span>                allow from all</span></span>
<span class="line"><span>        &lt;/Directory&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/</span></span>
<span class="line"><span>        &lt;Directory &quot;/usr/lib/cgi-bin&quot;&gt;</span></span>
<span class="line"><span>                AllowOverride None</span></span>
<span class="line"><span>                Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch</span></span>
<span class="line"><span>                Order allow,deny</span></span>
<span class="line"><span>                Allow from all</span></span>
<span class="line"><span>        &lt;/Directory&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ErrorLog \${APACHE_LOG_DIR}/error.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # Possible values include: debug, info, notice, warn, error, crit,</span></span>
<span class="line"><span>        # alert, emerg.</span></span>
<span class="line"><span>        LogLevel warn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        CustomLog \${APACHE_LOG_DIR}/access.log combined</span></span>
<span class="line"><span>&lt;/VirtualHost&gt;</span></span></code></pre></div><p>配置完成重启服务 <strong>/etc/init.d/apache2 restart</strong></p><hr><h1 id="samba服务" tabindex="-1">Samba服务 <a class="header-anchor" href="#samba服务" aria-label="Permalink to &quot;Samba服务&quot;">​</a></h1><hr><h2 id="samba多用户" tabindex="-1">Samba多用户 <a class="header-anchor" href="#samba多用户" aria-label="Permalink to &quot;Samba多用户&quot;">​</a></h2><hr><p><strong>useradd -d /home/test -s /usr/sbin/nologin yun useradd -d /home/test -s /usr/sbin/nologin white passwd yun passwd white smbpasswd -a yun smbpasswd -a white chown -R yun:yun /NetDisk chown -R white:white /NetDisk/DATA1/aa</strong></p><p>yun能访问读写所有目录，white仅访问/DATA1目录，仅能写/DATA1目录下的aa目录</p><p><strong>cp /etc/samba/smb.conf /etc/samba/smb.conf.bak vi /etc/samba/smb.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>interfaces = eth0 eth1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[global]</span></span>
<span class="line"><span>   workgroup = WORKGROUP</span></span>
<span class="line"><span>   server string = %h server</span></span>
<span class="line"><span>   dns proxy = no</span></span>
<span class="line"><span>   log file = /var/log/samba/log.%m</span></span>
<span class="line"><span>   max log size = 1000</span></span>
<span class="line"><span>   syslog only = yes</span></span>
<span class="line"><span>   syslog = 0</span></span>
<span class="line"><span>   security = user</span></span>
<span class="line"><span>   encrypt passwords = true</span></span>
<span class="line"><span>   passdb backend = tdbsam</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   obey pam restrictions = yes</span></span>
<span class="line"><span>   unix password sync = yes</span></span>
<span class="line"><span>   passwd program = /usr/bin/passwd %u</span></span>
<span class="line"><span>   passwd chat = *Enter\\snew\\s*\\spassword:* %n\\n *Retype\\snew\\s*\\spassword:* %n\\n *password\\supdated\\ssuccessfully*</span></span>
<span class="line"><span> .</span></span>
<span class="line"><span>   pam password change = yes</span></span>
<span class="line"><span>   map to guest = bad user</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   usershare allow guests = no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[white]</span></span>
<span class="line"><span>   comment = white Samba</span></span>
<span class="line"><span>   path = /NetDisk/DATA1</span></span>
<span class="line"><span>   browseable = yes</span></span>
<span class="line"><span>   writeable = yes</span></span>
<span class="line"><span>   create mask = 0700</span></span>
<span class="line"><span>   directory mask = 0700</span></span>
<span class="line"><span>   valid users = %S</span></span>
<span class="line"><span>#   force user = root</span></span>
<span class="line"><span>   printable = no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[yun]</span></span>
<span class="line"><span>   comment = Yun Samba</span></span>
<span class="line"><span>   path = /NetDisk</span></span>
<span class="line"><span>   browseable = yes</span></span>
<span class="line"><span>   writeable = yes</span></span>
<span class="line"><span>   create mask = 0700</span></span>
<span class="line"><span>   directory mask = 0700</span></span>
<span class="line"><span>   valid users = %S</span></span>
<span class="line"><span>   force user = root</span></span>
<span class="line"><span>   printable = no</span></span></code></pre></div><p>如果需要单用户配置一个用户即可</p><p>Win下如果多个用户登陆会报错<code>不允许一个用户使用一个以上用户名与一个服务器或共享资源的多重连接</code></p><p><code>CMD</code>打开命令终端后执行<code>net use * /del / use * /del /</code></p><hr><h1 id="rsync服务" tabindex="-1">Rsync服务 <a class="header-anchor" href="#rsync服务" aria-label="Permalink to &quot;Rsync服务&quot;">​</a></h1><hr><h2 id="服务端配置" tabindex="-1">服务端配置 <a class="header-anchor" href="#服务端配置" aria-label="Permalink to &quot;服务端配置&quot;">​</a></h2><hr><p><strong>apt-get install rsync vi /etc/default/rsync</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RSYNC_ENABLE=true</span></span></code></pre></div><p><strong>vi /etc/rsyncd.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>uid = root</span></span>
<span class="line"><span>gid = root</span></span>
<span class="line"><span>use chroot = no</span></span>
<span class="line"><span>max connections = 4</span></span>
<span class="line"><span>pid file = /var/run/rsyncd.pid</span></span>
<span class="line"><span>lock file = /var/run/rsync.lock</span></span>
<span class="line"><span>log file = /var/log/rsyncd.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[System_A]</span></span>
<span class="line"><span>path = /data/System_A</span></span>
<span class="line"><span>comment = System_Version_A</span></span>
<span class="line"><span>read only = yes</span></span>
<span class="line"><span>list = yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[System_B]</span></span>
<span class="line"><span>path = /data/System_B</span></span>
<span class="line"><span>comment = System_Version_B</span></span>
<span class="line"><span>read only = yes</span></span>
<span class="line"><span>list = yes</span></span></code></pre></div><p>配置完成 <strong>/etc/init.d/rsync start</strong></p><hr><h2 id="客户端使用" tabindex="-1">客户端使用： <a class="header-anchor" href="#客户端使用" aria-label="Permalink to &quot;客户端使用：&quot;">​</a></h2><hr><p><strong>rsync -v rsync://IP</strong> 可以查看Rsync目录信息</p><p><strong>rsync -avrtl --progress --delete --delete-excluded rsync://IP/System_A/ System_A</strong></p><p><strong>rsync -avH --progress --delete rsync://IP/System_A/ System_A</strong></p><p>即可同步System_A目录</p><p>如果只是校验System_A，则只需添加参数n</p><p><strong>rsync -avnH --progress --delete rsync://IP/System_A/ System_A</strong></p><p>如果只是同步本地目录</p><p><strong>rsync -avrtopg --progress --delete aa/ bb</strong></p><p><strong>rsync -avH --progress --delete aa/ bb</strong></p><p>将aa同步到bb</p><p>如果只是校验就加个<code>n</code>参数 <strong>rsync -avzrtopgn --progress --delete aa/ bb</strong></p><p>如果需要判断是否同步完成</p><p>检查最后有如下反馈：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sent 59656 bytes  received 526 bytes  120364.00 bytes/sec</span></span>
<span class="line"><span>total size is 188121746  speedup is 3125.88</span></span></code></pre></div><hr><h1 id="nfs共享" tabindex="-1">NFS共享 <a class="header-anchor" href="#nfs共享" aria-label="Permalink to &quot;NFS共享&quot;">​</a></h1><hr><h2 id="服务器配置" tabindex="-1">服务器配置 <a class="header-anchor" href="#服务器配置" aria-label="Permalink to &quot;服务器配置&quot;">​</a></h2><hr><p><strong>vi /etc/exports</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/NetDisk        *(rw,no_subtree_check,no_root_squash,async,wdelay,insecure)</span></span></code></pre></div><hr><h2 id="客户端" tabindex="-1">客户端 <a class="header-anchor" href="#客户端" aria-label="Permalink to &quot;客户端&quot;">​</a></h2><p><strong>mkdir /nfs mount -t nfs4 xxx.xxx.xxx.xxx:/ /nfs/</strong></p><p>加入fstab</p><p><strong>vi /etc/fstab</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xxx.xxx.xxx.xxx:/  /nfs          nfs4    soft,intr,rsize=8192,wsize=8192,nosuid</span></span></code></pre></div><hr><h1 id="苹果afp共享" tabindex="-1">苹果AFP共享 <a class="header-anchor" href="#苹果afp共享" aria-label="Permalink to &quot;苹果AFP共享&quot;">​</a></h1><hr><p><strong>在Debian 8的源里面已经没有<code>netatalk</code>，需要下载源码自己编译，<code>Debian 7</code>和<code>Ubuntu</code>有。</strong></p><p><strong>cp AppleVolumes.default AppleVolumes.default.bak vi AppleVolumes.default</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#~/                     &quot;Home Directory&quot;</span></span>
<span class="line"><span>/Disk &quot;TimeMachine&quot; options:tm</span></span></code></pre></div><p><strong>vi /etc/default/netatalk</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ATALKD_RUN=no</span></span>
<span class="line"><span>PAPD_RUN=no</span></span>
<span class="line"><span>TIMELORD_RUN=no</span></span>
<span class="line"><span>A2BOOT_RUN=no</span></span></code></pre></div><p><strong>vi /etc/netatalk/afpd.conf</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- -tcp -noddp -uamlist uams_dhx.so,uams_dhx2.so -nosavepassword</span></span></code></pre></div><p><strong>vi /etc/avahi/services/afpd.service</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE service-group SYSTEM &quot;avahi-service.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;service-group&gt;</span></span>
<span class="line"><span>        &lt;name replace-wildcards=&quot;yes&quot;&gt;%h&lt;/name&gt;</span></span>
<span class="line"><span>        &lt;service&gt;</span></span>
<span class="line"><span>                &lt;type&gt;_afpovertcp._tcp&lt;/type&gt;</span></span>
<span class="line"><span>                &lt;port&gt;548&lt;/port&gt;</span></span>
<span class="line"><span>        &lt;/service&gt;</span></span>
<span class="line"><span>        &lt;service&gt;</span></span>
<span class="line"><span>                &lt;type&gt;_device-info._tcp&lt;/type&gt;</span></span>
<span class="line"><span>                &lt;port&gt;0&lt;/port&gt;</span></span>
<span class="line"><span>                &lt;txt-record&gt;model=Xserve&lt;/txt-record&gt;</span></span>
<span class="line"><span>        &lt;/service&gt;</span></span>
<span class="line"><span>&lt;/service-group&gt;</span></span></code></pre></div><p><strong>/etc/init.d/netatalk restart /etc/init.d/avahi-daemon restart</strong></p><hr><h1 id="svn服务器" tabindex="-1">SVN服务器 <a class="header-anchor" href="#svn服务器" aria-label="Permalink to &quot;SVN服务器&quot;">​</a></h1><hr><p>安装支持库 <strong>apt-get install libapr1-dev libaprutil1-dev libtool</strong></p><p>编译安装svn 从<a href="http://subversion.apache.org/download/" target="_blank" rel="noreferrer">官网</a>下载最新的svn</p><p><strong>tar -xvf subversion-1.8.13.tar.bz2 cd subversion-1.8.13 ./autogen.sh ./configure make make install</strong></p><p>创建svn目录和版本库 <strong>mkdir /opt/svn svnadmin create /opt/svn/project</strong></p><p>初始化版本仓库中的目录</p><p>建立临时目录 <strong>mkdir -p project/test{1,2,3}</strong><strong>svn import project/ file:///opt/svn/project -m &quot;初始化SVN目录&quot;</strong></p><p>删除临时建立的目录 <strong>rm -rf project</strong></p><p>添加用户并修改访问策略 <strong>vi /opt/svn/project/conf/passwd</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[users]</span></span>
<span class="line"><span>white = 123</span></span></code></pre></div><p><strong>vi /opt/svn/project/conf/authz</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[/]</span></span>
<span class="line"><span>white = rw</span></span>
<span class="line"><span>* =</span></span></code></pre></div><p>修改svnserve.conf文件,让用户和策略配置升效 svnserve.conf内容如下:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[general]</span></span>
<span class="line"><span>anon-access = none</span></span>
<span class="line"><span>auth-access = write</span></span>
<span class="line"><span>password-db = passwd</span></span>
<span class="line"><span>authz-db = authz</span></span></code></pre></div><p>SVN服务脚本</p><p><strong>vi svn_start.sh</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/usr/local/bin/svnserve -d -r /opt/svn</span></span></code></pre></div><p><strong>vi svn_stop.sh</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fuser -k /usr/local/bin/svnserve</span></span></code></pre></div><p><strong>vi svn_restart.sh</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fuser -k /usr/local/bin/svnserve </span></span>
<span class="line"><span>/usr/local/bin/svnserve -d -r /opt/svn</span></span></code></pre></div><hr><h1 id="git服务器" tabindex="-1">Git服务器 <a class="header-anchor" href="#git服务器" aria-label="Permalink to &quot;Git服务器&quot;">​</a></h1><hr><p>安装git-core <strong>apt-get install git-core</strong></p><p>创建目录并初始化一个repository <strong>mkdir /opt/git cd /opt/git git init --bare white</strong></p><p>初始化提交 <strong>mkdir test1 cd test1 git init git remote add origin /opt/git/white touch Readme git add Readme git commit -m &quot;initial commit&quot; git push origin master</strong></p><p>Loacl本地使用 <strong>git clone /opt/git/white</strong></p><p>SSH使用 <strong>git clone <a href="mailto:root@172.168.10.137" target="_blank" rel="noreferrer">root@172.168.10.137</a>:/opt/git/white</strong></p><hr><h2 id="使用git-daemon搭建git服务" tabindex="-1">使用git-daemon搭建git服务 <a class="header-anchor" href="#使用git-daemon搭建git服务" aria-label="Permalink to &quot;使用git-daemon搭建git服务&quot;">​</a></h2><hr><p><strong>apt-get install git-daemon vi /etc/default/git-daemon</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GIT_DAEMON_ENABLE=true</span></span>
<span class="line"><span>GIT_DAEMON_USER=root</span></span>
<span class="line"><span>GIT_DAEMON_DIRECTORY=&quot;/var/cache/git /opt/git&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Additional options that are passed to the Daemon.</span></span>
<span class="line"><span>GIT_DAEMON_OPTIONS=&quot;--export-all --enable=upload-pack --enable=upload-archive --enable=receive-pack --informative-errors&quot;</span></span>
<span class="line"><span>GIT_DAEMON_BASE_PATH=/opt/git</span></span></code></pre></div><p>GIT_DAEMON_USER 用户权限，用户必须对git目录有权限 GIT_DAEMON_DIRECTORY 目录白名单 GIT_DAEMON_OPTIONS 参数，如果想上传且全部导出，就设置--export-all --enable=upload-pack --enable=upload-archive --enable=receive-pack，如果需要git push必须打开--enable=receive-pack GIT_DAEMON_BASE_PATH 根目录，设置git clone寻找的根目录</p><p><strong>/etc/init.d/git-daemon restart</strong></p><p><strong>git clone git://172.168.10.137/white</strong></p><h1 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h1><p>DIY的NAS更自主一些，虽然app支持神马的不如专业NAS，但如果爱好者自己使用，还是用直接搭建的系统比较舒服。</p>`,167)])])}const u=n(t,[["render",l]]);export{h as __pageData,u as default};
