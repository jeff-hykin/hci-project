require 'atk_toolbox'

# if you don't have npm
Atk.run("jeff-hykin/install-node")

system "npm install"

puts <<-HEREDOC
    
    ============================================================
    If you see an error above about #{'fevents'.blue} or #{'sass-loader'.blue}
    you can probably ignore it
    ============================================================
    just try going into the project directory and run `#{'_ serve'.light_magenta}`
HEREDOC