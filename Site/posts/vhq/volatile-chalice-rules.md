<div>
    <compute @=scripts/rule.js target='(Volatile Chalice)|(Explode Cup)|(EC)' root>
        <strong style='color: rgb(208, 128, 128);'><em>
            <argument target />
        </em></strong>
    </compute>
    <compute @=scripts/rule.js target='[Zz]ero' root>
        <argument target /> <small muted>(0)</small>
    </compute>
    <compute @=scripts/rule.js target='[Oo]ne' root>
        <argument target /> <small muted>(1)</small>
    </compute>
    <compute @=scripts/rule.js target='[Tt]wo' root>
        <argument target /> <small muted>(2)</small>
    </compute>
    <compute @=scripts/rule.js target='[Tt]hree' root>
        <argument target /> <small muted>(3)</small>
    </compute>
    <compute @=scripts/rule.js target='[Ff]our' root>
        <argument target /> <small muted>(4)</small>
    </compute>
    <compute @=scripts/rule.js target='[Ff]ive' root>
        <argument target /> <small muted>(5)</small>
    </compute>
    <compute @=scripts/rule.js target='[Ss]ix' root>
        <argument target /> <small muted>(6)</small>
    </compute>
    <compute @=scripts/rule.js target='[Tt]wenty' root>
        <argument target /> <small muted>(20)</small>
    </compute>
    </>
    <compute @=scripts/rule.js target='([Rr]ound(s)?)|([Gg]ame(s)?)|([Ss]et(s)?)|([Mm]atch(es)?)|(HP)|([Hh]ost)|([Cc]lient)' root>
        <em style='color: rgb(210, 220, 230);'><argument target /></em>
    </compute>
    <compute @=scripts/rule.js target='([Mm]atchu(s)?)|([Bb]racket(s)?)|([Pp]relim(s)?)' root>
        <em style='color: rgb(210, 220, 230);'><argument target /></em>
    </compute>
</div>

#### (*Explode Cup 2 rules, actually*)

<hr />

### Overview

Explode Cup is **not** an explode-only tournament. It is an MMT-like tournament with an *emphasis* on explode. Because of this, you can earn points with explode style, non-explode style, and by winning matches.

#### Terminology

Gameplay in RUMBLE is composed of a few parts:
- **Round**: One fight. Both players start at twenty HP and win by reducing the opponent to zero HP first.
- **Game**: A group of three rounds. You win a game by winning two rounds. One player will always be the host and one will be the client for the duration of one game, swapping at the start of the next game.
- **Set**: A group of two games. This includes one host game and one client game for each competitor.
- **Match**: A group of three sets. You win a match by following the EC rules over 6 games.

Additionally, EC uses some more terms:
- **Matchup**: One fight between two competitors (composed of one match). This is interchangeable with the term match.
- **Bracket**: One "block" of competition where competitors are ranked by fighting many matchups against each other. This term is used for both Swiss and Double-Elimination stages.
- **Prelims**: The first of three brackets in the Explode Cup. 