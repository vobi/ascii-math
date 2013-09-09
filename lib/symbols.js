var tokenTypes = require('./token-types');
var CONST = tokenTypes.CONST;
var UNARY = tokenTypes.UNARY;
var BINARY = tokenTypes.BINARY;
var INFIX = tokenTypes.INFIX;
var LEFTBRACKET = tokenTypes.LEFTBRACKET;
var RIGHTBRACKET = tokenTypes.RIGHTBRACKET;
var SPACE = tokenTypes.SPACE;
var UNDEROVER = tokenTypes.UNDEROVER;
var DEFINITION = tokenTypes.DEFINITION;
var LEFTRIGHT = tokenTypes.LEFTRIGHT;
var TEXT = tokenTypes.TEXT;

// MathML unicode according to http://www.w3.org/TR/MathML2/chapter6.html
var AMcal = [0x1D49C, 0x0212C, 0x1D49E, 0x1D49F, 0x02130, 0x02131, 0x1D4A2, 0x0210B, 0x02110, 0x1D4A5, 0x1D4A6, 0x02112, 0x02133, 0x1D4A9, 0x1D4AA, 0x1D4AB, 0x1D4AC, 0x0211B, 0x1D4AE, 0x1D4AF, 0x1D4B0, 0x1D4B1, 0x1D4B2, 0x1D4B3, 0x1D4B4, 0x1D4B5, 0x1D4B6, 0x1D4B7, 0x1D4B8, 0x1D4B9, 0x0212F, 0x1D4BB, 0x0210A, 0x1D4BD, 0x1D4BE, 0x1D4BF, 0x1D4C0, 0x1D4C1, 0x1D4C2, 0x1D4C3, 0x02134, 0x1D4C5, 0x1D4C6, 0x1D4C7, 0x1D4C8, 0x1D4C9, 0x1D4CA, 0x1D4CB, 0x1D4CC, 0x1D4CD, 0x1D4CE, 0x1D4CF];
var AMbcal = [0x1D4D0, 0x1D4D1, 0x1D4D2, 0x1D4D3, 0x1D4D4, 0x1D4D5, 0x1D4D6, 0x1D4D7, 0x1D4D8, 0x1D4D9, 0x1D4DA, 0x1D4DB, 0x1D4DC, 0x1D4DD, 0x1D4DE, 0x1D4DF, 0x1D4E0, 0x1D4E1, 0x1D4E2, 0x1D4E3, 0x1D4E4, 0x1D4E5, 0x1D4E6, 0x1D4E7, 0x1D4E8, 0x1D4E9, 0x1D4EA, 0x1D4EB, 0x1D4EC, 0x1D4ED, 0x1D4EE, 0x1D4EF, 0x1D4F0, 0x1D4F1, 0x1D4F2, 0x1D4F3, 0x1D4F4, 0x1D4F5, 0x1D4F6, 0x1D4F7, 0x1D4F8, 0x1D4F9, 0x1D4FA, 0x1D4FB, 0x1D4FC, 0x1D4FD, 0x1D4FE, 0x1D4FF, 0x1D500, 0x1D501, 0x1D502, 0x1D503];
var AMfrk = [0x1D504, 0x1D505, 0x0212D, 0x1D507, 0x1D508, 0x1D509, 0x1D50A, 0x0210C, 0x02111, 0x1D50D, 0x1D50E, 0x1D50F, 0x1D510, 0x1D511, 0x1D512, 0x1D513, 0x1D514, 0x0211C, 0x1D516, 0x1D517, 0x1D518, 0x1D519, 0x1D51A, 0x1D51B, 0x1D51C, 0x02128, 0x1D51E, 0x1D51F, 0x1D520, 0x1D521, 0x1D522, 0x1D523, 0x1D524, 0x1D525, 0x1D526, 0x1D527, 0x1D528, 0x1D529, 0x1D52A, 0x1D52B, 0x1D52C, 0x1D52D, 0x1D52E, 0x1D52F, 0x1D530, 0x1D531, 0x1D532, 0x1D533, 0x1D534, 0x1D535, 0x1D536, 0x1D537];
var AMbfrk = [0x1D56C, 0x1D56D, 0x1D56E, 0x1D56F, 0x1D570, 0x1D571, 0x1D572, 0x1D573, 0x1D574, 0x1D575, 0x1D576, 0x1D577, 0x1D578, 0x1D579, 0x1D57A, 0x1D57B, 0x1D57C, 0x1D57D, 0x1D57E, 0x1D57F, 0x1D580, 0x1D581, 0x1D582, 0x1D583, 0x1D584, 0x1D585, 0x1D586, 0x1D587, 0x1D588, 0x1D589, 0x1D58A, 0x1D58B, 0x1D58C, 0x1D58D, 0x1D58E, 0x1D58F, 0x1D590, 0x1D591, 0x1D592, 0x1D593, 0x1D594, 0x1D595, 0x1D596, 0x1D597, 0x1D598, 0x1D599, 0x1D59A, 0x1D59B, 0x1D59C, 0x1D59D, 0x1D59E, 0x1D59F];
var AMbbb = [0x1D538, 0x1D539, 0x02102, 0x1D53B, 0x1D53C, 0x1D53D, 0x1D53E, 0x0210D, 0x1D540, 0x1D541, 0x1D542, 0x1D543, 0x1D544, 0x02115, 0x1D546, 0x02119, 0x0211A, 0x0211D, 0x1D54A, 0x1D54B, 0x1D54C, 0x1D54D, 0x1D54E, 0x1D54F, 0x1D550, 0x02124, 0x1D552, 0x1D553, 0x1D554, 0x1D555, 0x1D556, 0x1D557, 0x1D558, 0x1D559, 0x1D55A, 0x1D55B, 0x1D55C, 0x1D55D, 0x1D55E, 0x1D55F, 0x1D560, 0x1D561, 0x1D562, 0x1D563, 0x1D564, 0x1D565, 0x1D566, 0x1D567, 0x1D568, 0x1D569, 0x1D56A, 0x1D56B, 0x1D7D8, 0x1D7D9, 0x1D7DA, 0x1D7DB, 0x1D7DC, 0x1D7DD, 0x1D7DE, 0x1D7DF, 0x1D7E0, 0x1D7E1];

var symbols = [
  //some greek symbols

  {input: "alpha", tag: "mi", output: "\u03B1", tex: null, ttype: CONST}, 
  {input: "beta", tag: "mi", output: "\u03B2", tex: null, ttype: CONST}, 
  {input: "chi", tag: "mi", output: "\u03C7", tex: null, ttype: CONST}, 
  {input: "delta", tag: "mi", output: "\u03B4", tex: null, ttype: CONST}, 
  {input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: CONST}, 
  {input: "epsi", tag: "mi", output: "\u03B5", tex: "epsilon", ttype: CONST}, 
  {input: "varepsilon", tag: "mi", output: "\u025B", tex: null, ttype: CONST}, 
  {input: "eta", tag: "mi", output: "\u03B7", tex: null, ttype: CONST}, 
  {input: "gamma", tag: "mi", output: "\u03B3", tex: null, ttype: CONST}, 
  {input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: CONST}, 
  {input: "iota", tag: "mi", output: "\u03B9", tex: null, ttype: CONST}, 
  {input: "kappa", tag: "mi", output: "\u03BA", tex: null, ttype: CONST}, 
  {input: "lambda", tag: "mi", output: "\u03BB", tex: null, ttype: CONST}, 
  {input: "Lambda", tag: "mo", output: "\u039B", tex: null, ttype: CONST}, 
  {input: "mu", tag: "mi", output: "\u03BC", tex: null, ttype: CONST}, 
  {input: "nu", tag: "mi", output: "\u03BD", tex: null, ttype: CONST}, 
  {input: "omega", tag: "mi", output: "\u03C9", tex: null, ttype: CONST}, 
  {input: "Omega", tag: "mo", output: "\u03A9", tex: null, ttype: CONST}, 
  {input: "phi", tag: "mi", output: "\u03C6", tex: null, ttype: CONST}, 
  {input: "varphi", tag: "mi", output: "\u03D5", tex: null, ttype: CONST}, 
  {input: "Phi", tag: "mo", output: "\u03A6", tex: null, ttype: CONST}, 
  {input: "pi", tag: "mi", output: "\u03C0", tex: null, ttype: CONST}, 
  {input: "Pi", tag: "mo", output: "\u03A0", tex: null, ttype: CONST}, 
  {input: "psi", tag: "mi", output: "\u03C8", tex: null, ttype: CONST}, 
  {input: "Psi", tag: "mi", output: "\u03A8", tex: null, ttype: CONST}, 
  {input: "rho", tag: "mi", output: "\u03C1", tex: null, ttype: CONST}, 
  {input: "sigma", tag: "mi", output: "\u03C3", tex: null, ttype: CONST}, 
  {input: "Sigma", tag: "mo", output: "\u03A3", tex: null, ttype: CONST}, 
  {input: "tau", tag: "mi", output: "\u03C4", tex: null, ttype: CONST}, 
  {input: "theta", tag: "mi", output: "\u03B8", tex: null, ttype: CONST}, 
  {input: "vartheta", tag: "mi", output: "\u03D1", tex: null, ttype: CONST}, 
  {input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: CONST}, 
  {input: "upsilon", tag: "mi", output: "\u03C5", tex: null, ttype: CONST}, 
  {input: "xi", tag: "mi", output: "\u03BE", tex: null, ttype: CONST}, 
  {input: "Xi", tag: "mo", output: "\u039E", tex: null, ttype: CONST}, 
  {input: "zeta", tag: "mi", output: "\u03B6", tex: null, ttype: CONST},

  //binary operation symbols
  //{input:"-",  tag:"mo", output:"\u0096", tex:null, ttype:CONST},

  {input: "*", tag: "mo", output: "\u22C5", tex: "cdot", ttype: CONST}, 
  {input: "**", tag: "mo", output: "\u22C6", tex: "star", ttype: CONST}, 
  {input: "//", tag: "mo", output: "/", tex: null, ttype: CONST}, 
  {input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: CONST}, 
  {input: "setminus", tag: "mo", output: "\\", tex: null, ttype: CONST}, 
  {input: "xx", tag: "mo", output: "\u00D7", tex: "times", ttype: CONST}, 
  {input: "-:", tag: "mo", output: "\u00F7", tex: "divide", ttype: CONST}, 
  {input: "@", tag: "mo", output: "\u26AC", tex: "circ", ttype: CONST}, 
  {input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: CONST}, 
  {input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: CONST}, 
  {input: "o.", tag: "mo", output: "\u2299", tex: "odot", ttype: CONST}, 
  {input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: UNDEROVER}, 
  {input: "prod", tag: "mo", output: "\u220F", tex: null, ttype: UNDEROVER}, 
  {input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: CONST}, 
  {input: "^^^", tag: "mo", output: "\u22C0", tex: "bigwedge", ttype: UNDEROVER}, 
  {input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: CONST}, 
  {input: "vvv", tag: "mo", output: "\u22C1", tex: "bigvee", ttype: UNDEROVER}, 
  {input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: CONST}, 
  {input: "nnn", tag: "mo", output: "\u22C2", tex: "bigcap", ttype: UNDEROVER}, 
  {input: "uu", tag: "mo", output: "\u222A", tex: "cup", ttype: CONST}, 
  {input: "uuu", tag: "mo", output: "\u22C3", tex: "bigcup", ttype: UNDEROVER},

  //binary relation symbols

  {input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: CONST}, 
  {input: ":=", tag: "mo", output: ":=", tex: null, ttype: CONST}, 
  {input: "lt", tag: "mo", output: "<", tex: null, ttype: CONST}, 
  {input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: CONST}, 
  {input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: CONST}, 
  {input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: CONST}, 
  {input: "geq", tag: "mo", output: "\u2265", tex: null, ttype: CONST}, 
  {input: "-<", tag: "mo", output: "\u227A", tex: "prec", ttype: CONST}, 
  {input: "-lt", tag: "mo", output: "\u227A", tex: null, ttype: CONST}, 
  {input: ">-", tag: "mo", output: "\u227B", tex: "succ", ttype: CONST}, 
  {input: "-<=", tag: "mo", output: "\u2AAF", tex: "preceq", ttype: CONST}, 
  {input: ">-=", tag: "mo", output: "\u2AB0", tex: "succeq", ttype: CONST}, 
  {input: "in", tag: "mo", output: "\u2208", tex: null, ttype: CONST}, 
  {input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: CONST}, 
  {input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: CONST}, 
  {input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: CONST}, 
  {input: "sube", tag: "mo", output: "\u2286", tex: "subseteq", ttype: CONST}, 
  {input: "supe", tag: "mo", output: "\u2287", tex: "supseteq", ttype: CONST}, 
  {input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: CONST}, 
  {input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: CONST}, 
  {input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: CONST}, 
  {input: "prop", tag: "mo", output: "\u221D", tex: "propto", ttype: CONST},

  //logical symbols

  {input: "and", tag: "mtext", output: "and", tex: null, ttype: SPACE}, 
  {input: "or", tag: "mtext", output: "or", tex: null, ttype: SPACE}, 
  {input: "not", tag: "mo", output: "\u00AC", tex: "neg", ttype: CONST}, 
  {input: "=>", tag: "mo", output: "\u21D2", tex: "implies", ttype: CONST}, 
  {input: "if", tag: "mo", output: "if", tex: null, ttype: SPACE}, 
  {input: "<=>", tag: "mo", output: "\u21D4", tex: "iff", ttype: CONST}, 
  {input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: CONST}, 
  {input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: CONST}, 
  {input: "_|_", tag: "mo", output: "\u22A5", tex: "bot", ttype: CONST}, 
  {input: "TT", tag: "mo", output: "\u22A4", tex: "top", ttype: CONST}, 
  {input: "|--", tag: "mo", output: "\u22A2", tex: "vdash", ttype: CONST}, 
  {input: "|==", tag: "mo", output: "\u22A8", tex: "models", ttype: CONST},

  //grouping brackets

  {input: "(", tag: "mo", output: "(", tex: null, ttype: LEFTBRACKET}, 
  {input: ")", tag: "mo", output: ")", tex: null, ttype: RIGHTBRACKET}, 
  {input: "[", tag: "mo", output: "[", tex: null, ttype: LEFTBRACKET}, 
  {input: "]", tag: "mo", output: "]", tex: null, ttype: RIGHTBRACKET}, 
  {input: "{", tag: "mo", output: "{", tex: null, ttype: LEFTBRACKET}, 
  {input: "}", tag: "mo", output: "}", tex: null, ttype: RIGHTBRACKET}, 
  {input: "|", tag: "mo", output: "|", tex: null, ttype: LEFTRIGHT},
  //{input:"||", tag:"mo", output:"||", tex:null, ttype:LEFTRIGHT},

  {input: "(:", tag: "mo", output: "\u2329", tex: "langle", ttype: LEFTBRACKET},
  {input: ":)", tag: "mo", output: "\u232A", tex: "rangle", ttype: RIGHTBRACKET},
  {input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: LEFTBRACKET},
  {input: ">>", tag: "mo", output: "\u232A", tex: null, ttype: RIGHTBRACKET},
  {input: "{:", tag: "mo", output: "{:", tex: null, ttype: LEFTBRACKET, invisible: true},
  {input: ":}", tag: "mo", output: ":}", tex: null, ttype: RIGHTBRACKET, invisible: true},

  //miscellaneous symbols

  {input: "int", tag: "mo", output: "\u222B", tex: null, ttype: CONST}, 
  {input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: DEFINITION}, 
  {input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: DEFINITION}, 
  {input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: DEFINITION}, 
  {input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: DEFINITION}, 
  {input: "oint", tag: "mo", output: "\u222E", tex: null, ttype: CONST}, 
  {input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: CONST}, 
  {input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: CONST}, 
  {input: "+-", tag: "mo", output: "\u00B1", tex: "pm", ttype: CONST}, 
  {input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: CONST}, 
  {input: "oo", tag: "mo", output: "\u221E", tex: "infty", ttype: CONST}, 
  {input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: CONST}, 
  {input: "...", tag: "mo", output: "...", tex: "ldots", ttype: CONST}, 
  {input: ":.", tag: "mo", output: "\u2234", tex: "therefore", ttype: CONST}, 
  {input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: CONST}, 
  {input: "\\ ", tag: "mo", output: "\u00A0", tex: null, ttype: CONST}, 
  {input: "quad", tag: "mo", output: "\u00A0\u00A0", tex: null, ttype: CONST}, 
  {input: "qquad", tag: "mo", output: "\u00A0\u00A0\u00A0\u00A0", tex: null, ttype: CONST}, 
  {input: "cdots", tag: "mo", output: "\u22EF", tex: null, ttype: CONST}, 
  {input: "vdots", tag: "mo", output: "\u22EE", tex: null, ttype: CONST}, 
  {input: "ddots", tag: "mo", output: "\u22F1", tex: null, ttype: CONST}, 
  {input: "diamond", tag: "mo", output: "\u22C4", tex: null, ttype: CONST}, 
  {input: "square", tag: "mo", output: "\u25A1", tex: null, ttype: CONST}, 
  {input: "|__", tag: "mo", output: "\u230A", tex: "lfloor", ttype: CONST}, 
  {input: "__|", tag: "mo", output: "\u230B", tex: "rfloor", ttype: CONST}, 
  {input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: CONST}, 
  {input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: CONST}, 
  {input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: CONST}, 
  {input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: CONST}, 
  {input: "QQ", tag: "mo", output: "\u211A", tex: null, ttype: CONST}, 
  {input: "RR", tag: "mo", output: "\u211D", tex: null, ttype: CONST}, 
  {input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: CONST},
  {input: "f", tag: "mi", output: "f", tex: null, ttype: UNARY, func: true},
  {input: "g", tag: "mi", output: "g", tex: null, ttype: UNARY, func: true},

  //standard functions

  {input: "lim", tag: "mo", output: "lim", tex: null, ttype: UNDEROVER}, 
  {input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: UNDEROVER},
  {input: "sin", tag: "mo", output: "sin", tex: null, ttype: UNARY, func: true},
  {input: "cos", tag: "mo", output: "cos", tex: null, ttype: UNARY, func: true},
  {input: "tan", tag: "mo", output: "tan", tex: null, ttype: UNARY, func: true},
  {input: "sinh", tag: "mo", output: "sinh", tex: null, ttype: UNARY, func: true},
  {input: "cosh", tag: "mo", output: "cosh", tex: null, ttype: UNARY, func: true},
  {input: "tanh", tag: "mo", output: "tanh", tex: null, ttype: UNARY, func: true},
  {input: "cot", tag: "mo", output: "cot", tex: null, ttype: UNARY, func: true},
  {input: "sec", tag: "mo", output: "sec", tex: null, ttype: UNARY, func: true},
  {input: "csc", tag: "mo", output: "csc", tex: null, ttype: UNARY, func: true},
  {input: "log", tag: "mo", output: "log", tex: null, ttype: UNARY, func: true},
  {input: "ln", tag: "mo", output: "ln", tex: null, ttype: UNARY, func: true},
  {input: "det", tag: "mo", output: "det", tex: null, ttype: UNARY, func: true}, 
  {input: "dim", tag: "mo", output: "dim", tex: null, ttype: CONST}, 
  {input: "mod", tag: "mo", output: "mod", tex: null, ttype: CONST},
  {input: "gcd", tag: "mo", output: "gcd", tex: null, ttype: UNARY, func: true},
  {input: "lcm", tag: "mo", output: "lcm", tex: null, ttype: UNARY, func: true}, 
  {input: "lub", tag: "mo", output: "lub", tex: null, ttype: CONST}, 
  {input: "glb", tag: "mo", output: "glb", tex: null, ttype: CONST}, 
  {input: "min", tag: "mo", output: "min", tex: null, ttype: UNDEROVER}, 
  {input: "max", tag: "mo", output: "max", tex: null, ttype: UNDEROVER},

  //arrows

  {input: "uarr", tag: "mo", output: "\u2191", tex: "uparrow", ttype: CONST}, 
  {input: "darr", tag: "mo", output: "\u2193", tex: "downarrow", ttype: CONST}, 
  {input: "rarr", tag: "mo", output: "\u2192", tex: "rightarrow", ttype: CONST}, 
  {input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: CONST}, 
  {input: ">->", tag: "mo", output: "\u21A3", tex: "rightarrowtail", ttype: CONST}, 
  {input: "->>", tag: "mo", output: "\u21A0", tex: "twoheadrightarrow", ttype: CONST}, 
  {input: ">->>", tag: "mo", output: "\u2916", tex: "twoheadrightarrowtail", ttype: CONST}, 
  {input: "|->", tag: "mo", output: "\u21A6", tex: "mapsto", ttype: CONST}, 
  {input: "larr", tag: "mo", output: "\u2190", tex: "leftarrow", ttype: CONST}, 
  {input: "harr", tag: "mo", output: "\u2194", tex: "leftrightarrow", ttype: CONST}, 
  {input: "rArr", tag: "mo", output: "\u21D2", tex: "Rightarrow", ttype: CONST}, 
  {input: "lArr", tag: "mo", output: "\u21D0", tex: "Leftarrow", ttype: CONST}, 
  {input: "hArr", tag: "mo", output: "\u21D4", tex: "Leftrightarrow", ttype: CONST},
  //commands with argument

  {input: "sqrt", tag: "msqrt", output: "sqrt", tex: null, ttype: UNARY}, 
  {input: "root", tag: "mroot", output: "root", tex: null, ttype: BINARY}, 
  {input: "frac", tag: "mfrac", output: "/", tex: null, ttype: BINARY}, 
  {input: "/", tag: "mfrac", output: "/", tex: null, ttype: INFIX}, 
  {input: "stackrel", tag: "mover", output: "stackrel", tex: null, ttype: BINARY}, 
  {input: "_", tag: "msub", output: "_", tex: null, ttype: INFIX}, 
  {input: "^", tag: "msup", output: "^", tex: null, ttype: INFIX},
  {input: "hat", tag: "mover", output: "^", tex: null, ttype: UNARY, acc: true},
  {input: "bar", tag: "mover", output: "\u00AF", tex: "overline", ttype: UNARY, acc: true},
  {input: "vec", tag: "mover", output: "\u2192", tex: null, ttype: UNARY, acc: true},
  {input: "dot", tag: "mover", output: ".", tex: null, ttype: UNARY, acc: true},
  {input: "ddot", tag: "mover", output: "..", tex: null, ttype: UNARY, acc: true},
  {input: "ul", tag: "munder", output: "\u0332", tex: "underline", ttype: UNARY, acc: true}, 
  {input: "text", tag: "mtext", output: "text", tex: null, ttype: TEXT}, 
  {input: "mbox", tag: "mtext", output: "mbox", tex: null, ttype: TEXT},
  {input: "\"", tag: "mtext", output: "mbox", tex: null, ttype: TEXT},
  {input: "bb", tag: "mstyle", atname: "fontweight", atval: "bold", output: "bb", tex: null, ttype: UNARY},
  {input: "mathbf", tag: "mstyle", atname: "fontweight", atval: "bold", output: "mathbf", tex: null, ttype: UNARY},
  {input: "sf", tag: "mstyle", atname: "fontfamily", atval: "sans-serif", output: "sf", tex: null, ttype: UNARY},
  {input: "mathsf", tag: "mstyle", atname: "fontfamily", atval: "sans-serif", output: "mathsf", tex: null, ttype: UNARY},
  {input: "bbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "bbb", tex: null, ttype: UNARY, codes: AMbbb},
  {input: "mathbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "mathbb", tex: null, ttype: UNARY, codes: AMbbb},
  {input: "cc", tag: "mstyle", atname: "mathvariant", atval: "script", output: "cc", tex: null, ttype: UNARY, codes: AMcal},
  {input: "mathcal", tag: "mstyle", atname: "mathvariant", atval: "script", output: "mathcal", tex: null, ttype: UNARY, codes: AMcal},
  {input: "bcc", tag: "mstyle", atname: "mathvariant", atval: "bold-script", output: "bcc", tex: null, ttype: UNARY, codes: AMbcal},
  {input: "mathbcal", tag: "mstyle", atname: "mathvariant", atval: "bold-script", output: "mathbcal", tex: null, ttype: UNARY, codes: AMbcal},
  {input: "tt", tag: "mstyle", atname: "fontfamily", atval: "monospace", output: "tt", tex: null, ttype: UNARY},
  {input: "mathtt", tag: "mstyle", atname: "fontfamily", atval: "monospace", output: "mathtt", tex: null, ttype: UNARY},
  {input: "fr", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "fr", tex: null, ttype: UNARY, codes: AMfrk},
  {input: "mathfrak", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "mathfrak", tex: null, ttype: UNARY, codes: AMfrk},
  {input: "bfr", tag: "mstyle", atname: "mathvariant", atval: "bold-fraktur", output: "bfr", tex: null, ttype: UNARY, codes: AMbfrk},
  {input: "mathbfrak", tag: "mstyle", atname: "mathvariant", atval: "bold-fraktur", output: "mathbfrak", tex: null, ttype: UNARY, codes: AMbfrk}
];

var texsymbols = [];
for (var i = 0; i < symbols.length; i++) {
  if (symbols[i].tex) {
    texsymbols.push({
      input: symbols[i].tex,
      tag: symbols[i].tag,
      output: symbols[i].output,
      ttype: symbols[i].ttype
    });
  }
}
symbols = symbols.concat(texsymbols);
symbols.sort(compareNames);

module.exports = symbols;

function compareNames(s1, s2) {
  if (s1.input > s2.input) return 1;
  else return -1;
}