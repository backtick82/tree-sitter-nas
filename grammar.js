/**
 * @file Nas grammar for tree-sitter
 * @author backtick
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "nas",

  extras: $ => [/[ \t\r]/],

  rules: {
    source_file: $ => seq(
      repeat(seq(optional(choice($._statement, $.comment)), $._newline)),
      optional(choice($._statement, $.comment))
    ),

    _statement: $ => choice(
      $.top_level_statement,
      $.label_definition,
      $.conditional_statement,
      $.action_statement
    ),

    top_level_statement: $ => choice(
      seq('using', alias($._word, $.identifier)),
      seq('include', alias($._path, $.path))
    ),


    label_definition: $ => seq(
      '#', alias($._label_word, $.label_name)
    ),

    conditional_statement: $ => choice(
      seq(
        choice('if', 'ifnot'),
        $.condition,
        alias($._conditional_action_statement, $.action_statement)
      ),
      seq(
        'else',
        alias($._conditional_action_statement, $.action_statement)
      )
    ),

    condition: $ => choice(
      seq('item', alias($._conditional_word, $.item_name)),
      seq('label', seq('#', alias($._label_word, $.label_name))),
      seq(
        $._condition_value,
        optional(seq(
          alias(choice('|=|', '|>|', '|>=|', '|<|', '|<=|', '|has|'), $.operator),
          $._condition_value
        ))
      )
    ),

    _condition_value: $ => choice(
      alias(choice("true", "false"), $.boolean),
      alias($._conditional_package_name, $.package_name),
      /-?\d+(\.\d+)?/,
      /"[^"\n\r]*"/u,
      /'[^'\n\r]*'/u
    ),

    action_statement: $ => seq(
      alias($._action_word, $.action_name),
      optional($.action_arguments)
    ),

    _conditional_action_statement: $ => seq(
      alias($._action_word, $.action_name),
      optional($.action_arguments)
    ),

    action_arguments: $ => repeat1(choice(
      $.unwrapped_package,
      $._line_content
    )),

    unwrapped_package: $ => seq(
      '{',
      alias($._package_name, $.package_name),
      '}'
    ),

    _line_content: $ => token(prec(1, /[^ \t\r\{\n\r]+/u)),

    _path: $ => /[^ \t\r\n]+/u,

    _word: $ => /[^ \t\r\n{}]+/u,

    _package_name: $ => /[^\t\r\n{} ]+/u,

    // _package_name is too greedy for conditionals, eats the whole thing
    _conditional_package_name: $ => /[^\t\r\n| ]+/u,

    _conditional_word: $ =>  /[^\t\r\n{}|]+/u,

    _action_word: $ => /[a-z]+/,

    _label_word: $ => /[^ \t\r\n|]+/u,

    comment: $ => seq('//', /[^\n\r]*/u),

    _newline: $ => /\n/
  }
});

