from dateutil.rrule import *
from dateutil.parser import *
from datetime import *

import pprint
import sys
d1 = date(2020,7,25)
d2 = date(2020,8,25)
bi_weekly = list(rrule(WEEKLY,interval=2,
             dtstart=d1,
            until=d2))

weekly = list(rrule(WEEKLY,interval=1,
             dtstart=d1,
            until=d2))

monthly = list(rrule(MONTHLY,interval=1,
             dtstart=d1,
            until=d2))

print("number of months: ", len(monthly)-1)
print("months: ", monthly)
print("number of weeks: ", len(weekly)-1)
print("weekly: ", weekly)
print("bi-weekly: ", len(bi_weekly)-1)
print("number of bi-weeks: ", bi_weekly)