require 'atk_toolbox'

# if you don't have npm
if not Console.has_command("npm")
    if OS.is?('mac')
        -"brew install node"
    elsif OS.is?('windows')
        -"scoop install nodejs"
    else
        -"sudo apt install nodejs"
    end
end

system "npm install"