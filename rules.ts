import fs from "fs";
import { KarabinerRules } from "./types";
import { app, command, createHyperSubLayers, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        description: "Page down",
        from: {
          key_code: "d",
          modifiers: {
            mandatory: [
              "left_command",
              "left_control",
              "left_shift",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "page_down",
          },
        ],
        type: "basic",
      },
      {
        description: "Page up",
        from: {
          key_code: "u",
          modifiers: {
            mandatory: [
              "left_command",
              "left_control",
              "left_shift",
              "left_option",
            ],
          },
        },
        to: [
          {
            key_code: "page_up",
          },
        ],
        // Avoid conflict with Hyper+w+u rule
        conditions: [
          {
            type: "variable_if",
            name: "hyper_sublayer_w",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_s",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_v",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_c",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_r",
            value: 0,
          },
        ],
        type: "basic",
      },
      {
        description: "Shift left move to prev word",
        from: {
          key_code: "left_shift",
        },
        to: [
          {
            key_code: "left_shift",
          },
        ],
        to_if_alone: [
          {
            key_code: "left_arrow",
            modifiers: ["left_option"],
          },
        ],
        conditions: [
          {
            type: "variable_if",
            name: "hyper_sublayer_w",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_s",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_v",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_c",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_r",
            value: 0,
          },
        ],
        type: "basic",
      },
      {
        description: "Shift right move to next word",
        from: {
          key_code: "right_shift",
        },
        to: [
          {
            key_code: "right_shift",
          },
        ],
        to_if_alone: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option"],
          },
        ],
        conditions: [
          {
            type: "variable_if",
            name: "hyper_sublayer_w",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_s",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_v",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_c",
            value: 0,
          },
          {
            type: "variable_if",
            name: "hyper_sublayer_r",
            value: 0,
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      n: app("Notion"),
      // t: Terminal
      t: app("Alacritty"),
      // Open todo list managed via *H*ypersonic
      // h: open(
      //   "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
      // ),
      s: app("Spotify"),
      f: app("Figma"),
      a: app("Arc"),
      // l: open(
      //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
      // ),
      // e: Emoji picker
      e: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      m: app("Google Meet"),
    },

    // w = "Window" via yabai
    w: {
      // Window navigation
      y: command(
        "Window: Navigate to Left",
        "/opt/homebrew/bin/yabai -m window --focus west"
      ),
      u: command(
        "Window: Navigate to Down",
        "/opt/homebrew/bin/yabai -m window --focus south"
      ),
      i: command(
        "Window: Navigate to Up",
        "/opt/homebrew/bin/yabai -m window --focus north"
      ),
      o: command(
        "Window: Navigate to Right",
        "/opt/homebrew/bin/yabai -m window --focus east"
      ),
      // Window movements
      h: command(
        "Window: Move Left",
        "/opt/homebrew/bin/yabai -m window --warp west"
      ),
      j: command(
        "Window: Move Down",
        "/opt/homebrew/bin/yabai -m window --warp south"
      ),
      k: command(
        "Window: Move Up",
        "/opt/homebrew/bin/yabai -m window --warp north"
      ),
      l: command(
        "Window: Move Right",
        "/opt/homebrew/bin/yabai -m window --warp east"
      ),
      // Window resizing
      n: command(
        "Window: Resize Left",
        "/opt/homebrew/bin/yabai -m window --resize left:-50:0; \
        /opt/homebrew/bin/yabai -m window --resize right:-50:0"
      ),
      m: command(
        "Window: Resize Down",
        "/opt/homebrew/bin/yabai -m window --resize bottom:0:50; \
        /opt/homebrew/bin/yabai -m window --resize top:0:50"
      ),
      comma: command(
        "Window: Resize Up",
        "/opt/homebrew/bin/yabai -m window --resize top:0:-50; \
        /opt/homebrew/bin/yabai -m window --resize bottom:0:-500"
      ),
      period: command(
        "Window: Resize Right",
        "/opt/homebrew/bin/yabai -m window --resize right:50:0; \
        /opt/homebrew/bin/yabai -m window --resize left:50:0"
      ),
      spacebar: command(
        "Window: Toggle Float/Unfloat",
        "/opt/homebrew/bin/yabai -m window --toggle float; \
        /opt/homebrew/bin/yabai -m window --toggle border"
      ),
      return_or_enter: command(
        "Window: Full Screen",
        "/opt/homebrew/bin/yabai -m window --toggle zoom-fullscreen"
      ),
      e: command(
        "Window: Equal size",
        "/opt/homebrew/bin/yabai -m space --balance"
      ),
      r: command(
        "Window: Rotate",
        "/opt/homebrew/bin/yabai -m space --rotate 90"
      ),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // // Magicmove via homerow.app
      // m: {
      //   to: [{ key_code: "f", modifiers: ["right_control"] }],
      // },
      // // Scroll mode via homerow.app
      // s: {
      //   to: [{ key_code: "j", modifiers: ["right_control"] }],
      // },
      // d: {
      //   to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      // },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      e: open("raycast://extensions/FezVrasta/emoji/emoji"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      p: open("raycast://confetti"),
      v: open("raycast://extensions/jomifepe/bitwarden/search"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
