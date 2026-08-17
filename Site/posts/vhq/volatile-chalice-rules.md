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
    <call scripts.rule target='(\b[Rr]ound(s)?\b)|(\b[Gg]ame(s)?\b)|(\b[Ss]et(s)?\b)|(\b[Mm]atch(es)?\b)|(\bHP\b)|(\b[Hh]ost\b)|(\b[Cc]lient\b)' root>
        <i><argument target></argument></i>
    </call>
</div>

## Overview

The Volatile Chalice is not an explode-only tournament. It is an MMT-like tournament with an emphasis on explode. Because of this, you can earn points with explode style, non-explode style, and by winning games.

### Terminology

Gameplay in RUMBLE is composed of a few parts:
- **Round**: One fight. Both players start at twenty HP and win by reducing the opponent to zero HP first.
- **Game**: A group of three rounds. You win a game by winning two rounds. One player will always be the host and one will be the client for the duration of one game, swapping at the start of the next game.
- **Set**: A group of two games. This includes one host game and one client game for each competitor.
- **Match**: A group of three sets. You win a match by scoring more than your opponent by the VC rules over six games.

Additionally, VC uses some more terms:
- **Matchup**: One fight between two competitors (composed of one match). This is interchangeable with the term match.
- **Bracket**: One "block" of competition where competitors are ranked by fighting many matchups against each other. This term is used for both Swiss and Double-Elimination stages.
- **Prelims**: The first of three brackets in the Volatile Chalice. It is a Swiss stage with no limit on signups and no judging required.
- **Majors**: The second of three brackets in the Volatile Chalice. It is a Swiss stage taking the top third of contestants from the prelims. It requires minimal judging.
- **Finals**: The third of three brackets in the Volatile Chalice. It is a Double-Elimination stage taking the top third of contestants from the majors.

### Tournament Structure

The Volatile Chalice will take place over four periods:
- Signups (one week)
- Prelims (six weeks)
- Majors (five weeks)
- Finals (four weeks)

For a total length of sixteen weeks or four months.

<blockquote>
    <small><i>Note: The timeline for the finals may change with the number of contestants.</i></small>
</blockquote>

- Signup period: starts <span data-tooltip='dd/mm/yyyy'>12/09/2026</span>
  - Judges & Competitors may sign up. Must be approved by the VHQ to be a VC judge.
- <span data-tooltip='swiss'>Prelim period</span>: starts <span data-tooltip='dd/mm/yyyy'>19/09/2026</span>
  - Competitors fight in matches using deviant rulesets involving explode.
- <span data-tooltip='swiss'>Major period</span>: starts <span data-tooltip='dd/mm/yyyy'>31/10/2026</span>
  - Remaining competitors fight in <span data-tooltip='Means: winning games grants points.'>for-points</span> matches judged by one style and one VC judge not picked by the competitors. 
- <span data-tooltip='double-elimination'>Final period</span>: starts <span data-tooltip='dd/mm/yyyy'>5/12/2026</span>
  - Finalist competitors fight in <span data-tooltip='Means: winning games grants points.'>for-points</span> matches judged by two style and one VC judge(s) picked by the competitors.

<hr />

## Gameplay & Scoring

For all three periods, the following rules are true:
- Whichever competitor in a matchup has more points at the end of the week will win the matchup. Golf scoring is not allowed in deviant matches.
- Competitors may choose to play on any map in RUMBLE, including custom maps, provided they are approved by the VHQ team.
- If judges are required by a ruleset, and judging is not complete by the end of the week, the partial score will be kept in determining the next matchups, but judges may go back and complete the matchup scoring for posterity and placement accuracy.

#### Prelim period

During the prelim period, matchups will be allowed to play any ruleset they like, so long as it follows these rules:
- The ruleset must be signed off on by the VHQ team.
- The ruleset must be symmetrical <small>(or made symmetrical with side-swapping)</small>.
- The ruleset must take place inside of RUMBLE.
- The ruleset must prioritize skill with explode.
- The ruleset must not create ties.
These rulesets are called deviant matches.

If a matchup does not agree upon an approved ruleset by the deadline <small>(<code data-tooltip='This is the RUMBLE leaderboard reset time.'>19:00 UTC-5</code> on the third day of the current week)</small>, then a default ruleset will be assigned to the matchup. The default ruleset is as follows:

<blockquote style='color: rgb(208, 90, 90); background-color: rgb(88, 50, 50);'>
    TODO: get default mode from Assassinator
</blockquote>

#### Major period

During the major period, matchups will play a simplified version of the [final period ruleset](#final-period) designed to minimize required judging. All rules listed here are modifications existing on top of the [final period ruleset](#final-period).

- Only one style judge will participate, but will assign five points.
- The VC judge will only assign four points.
- All style judges may participate as VC judges.
- If a match is partially judged, the second <small>(incomplete)</small> judge's score will be projected from the first <small>(complete)</small> judge's score, rounded towards the lower-scoring player. <small>(Rounding will not affect the outcome of matches)</small>.

#### Final period

- Competitors will play six games.
  - Each game win counts for one (1) point.
  - Competitors may switch maps after each set, should they agree to. 
    - If a competitor has won fewer games than the other after a given set, then they may decide to switch maps without agreement from their opponent.
- If a competitor forfeits a match or is disqualified <small>(see [grounds for disqualification](#match-conduct))</small>, all points will be assigned to the other competitor.
- Two style judges will each split three style points between the competitors by merit for general stylish gameplay <small>(including explode use)</small>.
- One VC judge will split five explode points between the competitors by merit for explode use.
  - VC judges may serve as style judges at their discretion.
- Each judge will assign one point per set and their remaining point(s) for overall performance.
- Judges may participate live or participate via vod review.
  - <small>To make judges' lives easier, competitors are expected to follow the rules listed under the [vod format ruleset](#match-conduct) precisely.</small>

<hr />

## Rules & Guidelines

#### Match conduct

<blockquote style='color: rgb(208, 90, 90); background-color: rgb(88, 50, 50);'>
    TODO: fill this is with grounds for disqualification, personal conduct, vod formatting, and stuff from the original document
</blockquote>

#### Out-Of-Match conduct

<blockquote style='color: rgb(208, 90, 90); background-color: rgb(88, 50, 50);'>
    TODO: fill this is with grounds for removal, out-of-match/discord rules, and stuff from the original document
</blockquote>

#### Judge conduct

<blockquote style='color: rgb(208, 90, 90); background-color: rgb(88, 50, 50);'>
    TODO: fill this is with all of the judge guidelines, broken down by style/explode and majors/finals
</blockquote>

#### VHQ Team conduct

<blockquote style='color: rgb(208, 90, 90); background-color: rgb(88, 50, 50);'>
    TODO: fill this is with requirements for ourselves, commitments, and rights reservations
</blockquote>