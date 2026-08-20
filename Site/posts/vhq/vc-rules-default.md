<div>
    <call scripts.rule target='(Volatile Chalice)|(Explode Cup)|(\bEC\b)|(\bVC\b)' root>
        <strong style='color: rgb(208, 128, 128);'><em>
            <argument target></argument>
        </em></strong>
    </call>
    <call scripts.rule target='\b[Zz]ero\b' root>
        <argument target></argument> <small muted>(0)</small>
    </call>
    <call scripts.rule target='\b[Oo]ne\b' root>
        <argument target></argument> <small muted>(1)</small>
    </call>
    <call scripts.rule target='\b[Tt]wo\b' root>
        <argument target></argument> <small muted>(2)</small>
    </call>
    <call scripts.rule target='\b[Tt]hree\b' root>
        <argument target></argument> <small muted>(3)</small>
    </call>
    <call scripts.rule target='\b[Ff]our\b' root>
        <argument target></argument> <small muted>(4)</small>
    </call>
    <call scripts.rule target='\b[Ff]ive\b' root>
        <argument target></argument> <small muted>(5)</small>
    </call>
    <call scripts.rule target='\b[Ss]ix\b' root>
        <argument target></argument> <small muted>(6)</small>
    </call>
    <call scripts.rule target='\b[Ss]ixteen\b' root>
        <argument target></argument> <small muted>(16)</small>
    </call>
    <call scripts.rule target='\b[Tt]wenty\b' root>
        <argument target></argument> <small muted>(20)</small>
    </call>
    </>
    <call scripts.rule target='(\b[Mm]atchup(s)?\b)|(\b[Bb]racket(s)?\b)|(\b[Pp]relim(s)?\b)|(\b[Mm]ajor(s)?\b)|(\b[Ff]inal(s)?\b)|([Dd]eviant(s)?)' root>
        <i><argument target></argument></i>
    </call>
    <call scripts.rule target='(\b[Rr]ound(s)?\b)|(\b[Gg]ame(s)?\b)|(\b[Ss]et(s)?\b)|(\b[Mm]atch(es)?\b)|(\bHP\b)|(\b[Hh]ost\b)|(\b[Cc]lient\b)|(\bKO\b)|(\bKOVP\b)|(\bKnockout VP\b)' root>
        <i><argument target></argument></i>
    </call>
    <call scripts.rule target='(\b[Tt]he Ring\b)|(\b[Tt]he Pit\b)' root>
        <i><argument target></argument></i>
    </call>
</div>

### Terms

All terms follow the [Volatile Chalice terms](?namespace=vhq&post=volatile-chalice-rules#terms).

### Shiftstone Restrictions

Competitors are:
1) Required to use the volatile shiftstone.
2) Forbidden from using the stubborn shiftstone.

### Scoring

Competitors will play 6 <span data-tooltip='Means: winning games grants points'>for-points</span> games on the Ring.

In addition to the traditional score system, competitors will fight for KO points.

KO Points (different to the KOVP)

1.2 Whenever Host knocks their opponent off the ring (a ringout as we'd call it) you get 1 KO Point. 
1.3 If a client gets a round win, they get 0.5 KO Points even if its not via KO (this helps make client rounds more valuable). And if client gets a KO, it is only worth 1 KO Point, regardless of the fact that it is also a client round win.
1.4 Both players must keep count of their KO Points
1.5 Whoever has the most KO Points at the end of 10 games gets a KOVP worth 1 game point. 

Stone Restrictions
2.1 During the match, each player must always have volatile equipped, and no player may ever equip stubborn.

Edge cases
3.1 Simultaneous Ringout -  The game will still register who hits a kill box a fraction of a second earlier to define a round winner. This is irrelevant. If both players are in the gutter at round end due to knockback applied before a player had died, it was a simultaneous KO. If a simultaneous ringout occurs, host and client both get 1 KO Point
3.2 If a player's HP is reduced to 0, and knocked out of the ring on the last hit, the standard KO Points are awarded

Scoring
4.1 If opponents are tied in KO Points, no KOVP is given, and score is decided by game wins. 
4.2 If opponents are tied in KO points and game wins, KO Points are reset and tiebreakers begin
 
Tiebreaker:
5.1 The standard client round bar is irrelevant in this gamemode, "and game wins are disregarded from the beginning of tiebreakers forward"
5.2 KO Point Bar is set as the points difference of KO Points at the end of a set after tiebreakers have begun
5.3 If the difference of KO Points at the end of a set after tiebreakers have begun is zero, then standard extended tiebreaker rules may begin, with the adjustment that 2.1 must be followed in all circumstances
5.4 When the KO Point Bar is set, the player trying to match or raise the bar gets one set to match or exceed the other player's KO Points, "including any points their opponent may earn during said set"
5.5 No killing yourself, intentionally or unintentionally. Doing so will award the opponent 0.5 KO Points. 
5.6 Flying off the map intentionally or unintentionally counts as a ring out for the opponent instead of killing yourself, awarding them 1 KO Point as per ring out rules