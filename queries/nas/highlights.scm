"using" @keyword.directive
"include" @keyword.import
(path) @string.special.path

"#" @punctuation.definition.macro
(label_name) @function.macro

[ "if" "ifnot" "else" ] @keyword.conditional
(operator) @keyword.operator
(boolean) @boolean

"item" @keyword
"label" @keyword
(item_name) @variable.builtin

(action_arguments) @string
(action_name) @function.builtin
((action_name) @function.call (#any-of? @function.call "call" "jump" "goto" ))
((action_name) @function.call (#any-of? @function.call "call" "jump" "goto" ) (label_name) @function.macro)

"{" @punctuation.bracket
"}" @punctuation.bracket
(package_name) @variable
((package_name) @variable.builtin (#match? @variable "(?i)^(MBCoords|MBX|MBY|MBZ|PlayerCoords|PlayerHeldBlock|PlayerX|PlayerY|PlayerZ|PlayerCoordsPrecise|PlayerPX|PlayerPY|PlayerPZ|PlayerYaw|PlayerPitch|PlayerPronouns|PlayerClient|msgDelay|epochMS|zone|zoneMotd|cef|webclient|mobile|actionCount|actionLimit|LevelName|LevelX|LevelY|LevelZ|PI)$"))
((package_name) @variable.parameter (#match? @variable "(?i)^runArg\d+$"))

(comment) @comment

(ERROR) @comment.error

