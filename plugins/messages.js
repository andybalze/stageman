var Random = require("random-js")
 , random = new Random(Random.engines.mt19937().autoSeed());

var quotes = [
    "To err is human... to really foul up requires the root password.",
    "Some things man was never meant to know. For everything else, there's Google.",
    "Passwords are like underwear. You shouldn't leave them out where people can see them. You should change them regularly. And you shouldn't loan them out to strangers.",
    "A Life? Cool! Where can I download one of those?",
    "Artificial Intelligence is no match for Natural Stupidity.",
    "A computer lets you make more mistakes faster than any invention in human history - with the possible exceptions of handguns and tequila.",
    "Windows has detected you do not have a keyboard. Press 'F9' to continue.",
    "People say that if you play Microsoft's CDs backwards, you hear satanic things, but that's nothing, because if you play them forwards, they install Windows.",
    "In a world without fences and walls, who needs Gates and Windows?",
    "MICROSOFT = Most Intelligent Customers Realize Our Software Only Fools Teenagers",
    "Concept: On the keyboard of life, always keep one finger on the escape button.",
    "Like car accidents, most hardware problems are due to driver error.",
    "Life would be so much easier if we only had the source code.",
    "My software never has bugs. It just develops random features.",
    "Microsoft: \"You've got questions. We've got dancing paperclips.\""
];


module.exports = {
    getString: function() {
        return "<div class=\"draggable alert alert-info alert-dismissable hidden-print\" style=\"margin-top: 10px;\">"
        + "<i class='fa-comments fa fa-fw'></i>"
        + quotes[random.integer(0, quotes.length-1)]
        + "<button data-dismiss=\"alert\" class=\"close\">x</button></div>";
    }
};



