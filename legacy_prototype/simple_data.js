const exerciseData = {
  pushups: {
    name: "Push-ups",
    steps: [
      {
        name: "Wall Push-ups",
        imagePrompt: "A person performing a wall push-up with hands against a wall, body at an angle",
        performance: [
          "Stand facing a wall, about arm's length away",
          "Place your hands flat on the wall at shoulder height and width",
          "Keep your body straight and lean forward",
          "Bend your elbows to bring your chest close to the wall",
          "Push back to starting position"
        ],
        wisdom: "The journey of a thousand push-ups begins with a single wall.",
        masterGoal: "3 sets of 50 reps"
      },
      {
        name: "Incline Push-ups",
        imagePrompt: "Person doing push-ups with hands elevated on a bench or platform",
        performance: [
          "Find a stable elevated surface (bench, table, or step)",
          "Place hands shoulder-width apart on the surface",
          "Step back until body forms a straight line",
          "Lower chest to the surface",
          "Push back up to starting position"
        ],
        wisdom: "Every angle conquered is strength earned.",
        masterGoal: "3 sets of 40 reps"
      },
      {
        name: "Kneeling Push-ups",
        imagePrompt: "Person performing push-ups from knees with straight back",
        performance: [
          "Start on hands and knees",
          "Hands shoulder-width apart, directly under shoulders",
          "Cross ankles behind you",
          "Keep core tight and back straight",
          "Lower chest to floor, push back up"
        ],
        wisdom: "Knees down, pride intact. Progress is progress.",
        masterGoal: "3 sets of 30 reps"
      },
      {
        name: "Half Push-ups",
        imagePrompt: "Person doing push-ups halfway down in standard position",
        performance: [
          "Assume standard push-up position",
          "Hands shoulder-width, body straight",
          "Lower halfway down",
          "Hold briefly",
          "Push back to start"
        ],
        wisdom: "Half the depth, double the control.",
        masterGoal: "2 sets of 25 reps"
      },
      {
        name: "Full Push-ups",
        imagePrompt: "Person performing a perfect standard push-up with chest touching ground",
        performance: [
          "Hands shoulder-width apart on floor",
          "Body in straight line from head to heels",
          "Lower until chest touches floor",
          "Keep elbows at 45-degree angle",
          "Push explosively back to start"
        ],
        wisdom: "This is where boys become men.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Close Push-ups",
        imagePrompt: "Person doing push-ups with hands close together under chest",
        performance: [
          "Hands directly under chest, almost touching",
          "Elbows stay close to body",
          "Lower with control",
          "Feel the triceps burn",
          "Push back explosively"
        ],
        wisdom: "Narrow the base, broaden the strength.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Uneven Push-ups",
        imagePrompt: "Person doing push-ups with one hand elevated on basketball or platform",
        performance: [
          "Place one hand on a basketball or elevated surface",
          "Other hand flat on floor",
          "Lower evenly despite uneven base",
          "Alternate hands between sets",
          "Maintain balance and control"
        ],
        wisdom: "Life isn't balanced. Your strength should be.",
        masterGoal: "2 sets of 20 reps each side"
      },
      {
        name: "1/2 One-Arm Push-ups",
        imagePrompt: "Person performing assisted one-arm push-up with other hand providing minimal support",
        performance: [
          "Standard push-up position",
          "Shift weight to one arm",
          "Other hand provides light support",
          "Lower as far as possible",
          "Use support hand minimally on the way up"
        ],
        wisdom: "The support hand is just a memory of weakness.",
        masterGoal: "2 sets of 20 reps each arm"
      },
      {
        name: "Lever Push-ups",
        imagePrompt: "Person doing one-arm push-up with free arm extended behind back",
        performance: [
          "One hand on floor, shoulder-width stance with legs",
          "Free arm extends behind back",
          "Lower slowly with control",
          "Push up with one arm doing the work",
          "Keep core extremely tight"
        ],
        wisdom: "One arm, one goal, no excuses.",
        masterGoal: "2 sets of 20 reps each arm"
      },
      {
        name: "One-Arm Push-ups",
        imagePrompt: "Person performing perfect one-arm push-up with feet together and free hand behind back",
        performance: [
          "Feet together, one hand centered under body",
          "Free arm behind back",
          "Lower chest to floor with perfect control",
          "Body stays rigid throughout",
          "Push up with explosive power"
        ],
        wisdom: "Master Step. You are no longer ordinary.",
        masterGoal: "1 set of 100 reps each arm"
      }
    ]
  },
  squats: {
    name: "Squats",
    steps: [
      {
        name: "Shoulderstand Squats",
        imagePrompt: "Person lying on back with legs vertical, performing squats in the air",
        performance: [
          "Lie on your back",
          "Bring legs up vertical",
          "Support lower back with hands",
          "Bend knees to 'squat' in the air",
          "Extend legs back to vertical"
        ],
        wisdom: "Even gravity can't stop your progress.",
        masterGoal: "3 sets of 50 reps"
      },
      {
        name: "Jackknife Squats",
        imagePrompt: "Person in seated position on floor performing squatting motion",
        performance: [
          "Sit on floor, knees bent",
          "Feet flat, arms extended forward",
          "Roll back slightly",
          "Use momentum to rock forward and up",
          "Stand fully, then reverse"
        ],
        wisdom: "Momentum is a tool, control is the master.",
        masterGoal: "3 sets of 40 reps"
      },
      {
        name: "Supported Squats",
        imagePrompt: "Person squatting while holding onto a stable post or door frame",
        performance: [
          "Hold onto a stable object (post, door frame)",
          "Feet shoulder-width apart",
          "Lower into full squat",
          "Use hands for balance only",
          "Push through heels to stand"
        ],
        wisdom: "Support builds confidence, confidence builds independence.",
        masterGoal: "3 sets of 30 reps"
      },
      {
        name: "Half Squats",
        imagePrompt: "Person performing squat to parallel position",
        performance: [
          "Stand with feet shoulder-width apart",
          "Lower until thighs are parallel to ground",
          "Keep chest up, knees tracking over toes",
          "Drive through heels to return",
          "No deeper than parallel yet"
        ],
        wisdom: "Half depth today, full power tomorrow.",
        masterGoal: "2 sets of 50 reps"
      },
      {
        name: "Full Squats",
        imagePrompt: "Person in deep squat position with thighs below parallel",
        performance: [
          "Feet shoulder-width, toes slightly out",
          "Lower until hamstrings touch calves",
          "Keep heels on ground",
          "Chest up, back neutral",
          "Explode back to standing"
        ],
        wisdom: "Ass to grass, king of the yard.",
        masterGoal: "2 sets of 30 reps"
      },
      {
        name: "Close Squats",
        imagePrompt: "Person squatting with feet together, hands clasped in front",
        performance: [
          "Feet and knees together",
          "Hands clasped in front for balance",
          "Lower into full squat",
          "Knees stay together throughout",
          "Stand with control"
        ],
        wisdom: "Narrow your stance, expand your limits.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Uneven Squats",
        imagePrompt: "Person squatting with one foot on basketball, other foot flat",
        performance: [
          "One foot on basketball or platform",
          "Other foot flat on ground",
          "Squat down evenly",
          "Elevated leg works harder",
          "Alternate legs between sets"
        ],
        wisdom: "Imbalance creates balance.",
        masterGoal: "2 sets of 20 reps each leg"
      },
      {
        name: "1/2 One-Leg Squats",
        imagePrompt: "Person performing assisted pistol squat with light support",
        performance: [
          "One leg extended forward",
          "Light fingertip support on wall",
          "Lower on one leg as far as possible",
          "Use support minimally",
          "Push back to standing"
        ],
        wisdom: "The wall remembers when you needed it. Soon you won't.",
        masterGoal: "2 sets of 20 reps each leg"
      },
      {
        name: "Assisted One-Leg Squats",
        imagePrompt: "Person doing pistol squat holding onto vertical support",
        performance: [
          "Hold post or door frame with one hand",
          "One leg extended forward parallel to ground",
          "Lower into full one-leg squat",
          "Touch butt to heel of standing leg",
          "Use hand for balance only"
        ],
        wisdom: "One leg, infinite potential.",
        masterGoal: "2 sets of 20 reps each leg"
      },
      {
        name: "One-Leg Squats",
        imagePrompt: "Person performing perfect pistol squat with no support, leg extended forward",
        performance: [
          "Balance on one leg",
          "Other leg extended straight forward",
          "Lower until butt touches heel",
          "Arms forward for counterbalance",
          "Stand with explosive power"
        ],
        wisdom: "The pistol squat: where legends are forged.",
        masterGoal: "2 sets of 50 reps each leg"
      }
    ]
  },
  pullups: {
    name: "Pull-ups",
    steps: [
      {
        name: "Vertical Pulls",
        imagePrompt: "Person pulling against a horizontal bar or table edge while feet on ground",
        performance: [
          "Grab a horizontal bar at waist height",
          "Walk feet forward until body is angled back",
          "Pull chest to bar",
          "Lower with control",
          "Keep body straight throughout"
        ],
        wisdom: "The bar doesn't care about your excuses.",
        masterGoal: "3 sets of 40 reps"
      },
      {
        name: "Horizontal Pulls",
        imagePrompt: "Person performing inverted rows under a bar with body parallel to ground",
        performance: [
          "Lie under bar, grab with overhand grip",
          "Body straight from heels to head",
          "Pull chest to bar",
          "Lower until arms fully extended",
          "Squeeze shoulder blades together at top"
        ],
        wisdom: "Horizontal today, vertical tomorrow.",
        masterGoal: "3 sets of 30 reps"
      },
      {
        name: "Jackknife Pull-ups",
        imagePrompt: "Person hanging from bar with knees bent and feet supported on elevated surface",
        performance: [
          "Hang from bar",
          "Feet on bench or platform behind you",
          "Pull up until chin over bar",
          "Use legs minimally",
          "Focus on back and arm engagement"
        ],
        wisdom: "Support is temporary, strength is permanent.",
        masterGoal: "3 sets of 20 reps"
      },
      {
        name: "Half Pull-ups",
        imagePrompt: "Person performing pull-up to halfway point",
        performance: [
          "Dead hang from bar",
          "Pull up until elbows at 90 degrees",
          "Hold briefly",
          "Lower with control",
          "No kipping or swinging"
        ],
        wisdom: "Half reps, full effort.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Full Pull-ups",
        imagePrompt: "Person performing full pull-up with chin over bar",
        performance: [
          "Full dead hang, arms completely straight",
          "Pull until chin clearly over bar",
          "Control the movement both ways",
          "No momentum or kipping",
          "Full range of motion every rep"
        ],
        wisdom: "This is the standard. Everything before was preparation.",
        masterGoal: "2 sets of 10 reps"
      },
      {
        name: "Close Pull-ups",
        imagePrompt: "Person doing pull-ups with hands close together, nearly touching",
        performance: [
          "Hands 6 inches apart or less",
          "Pull straight up",
          "Chin over bar",
          "Feel the biceps and inner back burn",
          "Strict form throughout"
        ],
        wisdom: "Close grip, tight control, maximum growth.",
        masterGoal: "2 sets of 10 reps"
      },
      {
        name: "Uneven Pull-ups",
        imagePrompt: "Person performing pull-up with one hand high, one hand low on bar",
        performance: [
          "One hand in normal position",
          "Other hand lower on bar or towel",
          "Pull up favoring the higher hand",
          "Lower hand assists minimally",
          "Alternate hands each set"
        ],
        wisdom: "Uneven bars, equal determination.",
        masterGoal: "2 sets of 10 reps each side"
      },
      {
        name: "1/2 One-Arm Pull-ups",
        imagePrompt: "Person doing one-arm pull-up with other hand gripping wrist of pulling arm",
        performance: [
          "One hand on bar",
          "Other hand grabs pulling wrist",
          "Pull up as high as possible",
          "Assist hand does minimal work",
          "Lower slowly"
        ],
        wisdom: "The assisting hand is just a guide, not a crutch.",
        masterGoal: "2 sets of 10 reps each arm"
      },
      {
        name: "Assisted One-Arm Pull-ups",
        imagePrompt: "Person performing one-arm pull-up with free hand holding towel hung from bar",
        performance: [
          "One hand on bar",
          "Other hand holds towel hanging from bar",
          "Pull up to chin height",
          "Use towel hand for minimal assistance",
          "Focus on working arm"
        ],
        wisdom: "One arm pulls, one arm dreams.",
        masterGoal: "2 sets of 8 reps each arm"
      },
      {
        name: "One-Arm Pull-ups",
        imagePrompt: "Person performing perfect one-arm pull-up with free arm hanging or behind back",
        performance: [
          "One hand on bar, perfect grip",
          "Other arm hangs or behind back",
          "Pull until chin clearly over bar",
          "Zero assistance or momentum",
          "Lower with complete control"
        ],
        wisdom: "Master Step. You have become exceptional.",
        masterGoal: "2 sets of 6 reps each arm"
      }
    ]
  },
  leg_raises: {
    name: "Leg Raises",
    steps: [
      {
        name: "Knee Tucks",
        imagePrompt: "Person lying on back pulling knees to chest",
        performance: [
          "Lie flat on back",
          "Pull knees to chest",
          "Curl pelvis off floor",
          "Lower with control",
          "Keep lower back pressed down"
        ],
        wisdom: "The core is the foundation of all power.",
        masterGoal: "3 sets of 40 reps"
      },
      {
        name: "Flat Knee Raises",
        imagePrompt: "Person lying flat raising bent knees toward chest",
        performance: [
          "Lie flat, hands under glutes",
          "Knees bent at 90 degrees",
          "Raise knees toward chest",
          "Lower until feet hover above ground",
          "No momentum"
        ],
        wisdom: "Slow and controlled beats fast and sloppy.",
        masterGoal: "3 sets of 35 reps"
      },
      {
        name: "Flat Bent Leg Raises",
        imagePrompt: "Person lying flat raising legs with knees slightly bent",
        performance: [
          "Lie flat on back",
          "Legs slightly bent",
          "Raise legs until vertical",
          "Lower until just off ground",
          "Constant tension on abs"
        ],
        wisdom: "Bend the knees, not the willpower.",
        masterGoal: "3 sets of 30 reps"
      },
      {
        name: "Flat Frog Raises",
        imagePrompt: "Person lying flat with feet together, knees out, raising legs in frog position",
        performance: [
          "Lie flat, feet together, knees out",
          "Frog leg position",
          "Raise legs keeping feet together",
          "Lower with control",
          "Focus on lower abs"
        ],
        wisdom: "Like a frog, spring into power.",
        masterGoal: "3 sets of 25 reps"
      },
      {
        name: "Flat Straight Leg Raises",
        imagePrompt: "Person lying flat raising straight legs to vertical",
        performance: [
          "Lie completely flat",
          "Legs perfectly straight",
          "Raise to vertical",
          "Lower until hovering",
          "Zero momentum or swinging"
        ],
        wisdom: "Straight legs, straight gains.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Hanging Knee Raises",
        imagePrompt: "Person hanging from bar pulling knees up toward chest",
        performance: [
          "Dead hang from bar",
          "Pull knees to chest",
          "Curl pelvis up",
          "Lower with complete control",
          "No swinging"
        ],
        wisdom: "Hang tough, raise tougher.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Hanging Bent Leg Raises",
        imagePrompt: "Person hanging raising legs with knees bent to 90 degrees",
        performance: [
          "Hang from bar",
          "Knees bent 90 degrees",
          "Raise thighs to horizontal",
          "Hold briefly",
          "Lower slowly"
        ],
        wisdom: "Every raise is a battle won.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Hanging Frog Raises",
        imagePrompt: "Person hanging from bar with knees out, feet together, raising legs in frog position",
        performance: [
          "Dead hang position",
          "Feet together, knees out wide",
          "Raise knees to chest height",
          "Frog position throughout",
          "Controlled lowering"
        ],
        wisdom: "The frog position never quits.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Partial Straight Leg Raises",
        imagePrompt: "Person hanging raising straight legs to horizontal position",
        performance: [
          "Hang from bar",
          "Legs completely straight",
          "Raise to horizontal",
          "No higher than parallel",
          "Lower with perfect control"
        ],
        wisdom: "Horizontal is the new vertical.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Hanging Straight Leg Raises",
        imagePrompt: "Person hanging raising straight legs all the way to touch bar",
        performance: [
          "Dead hang from bar",
          "Legs locked straight",
          "Raise feet to touch bar",
          "Pike position at top",
          "Slow eccentric down"
        ],
        wisdom: "Touch the bar with your feet. Touch greatness with your spirit.",
        masterGoal: "2 sets of 30 reps"
      }
    ]
  },
  bridges: {
    name: "Bridges",
    steps: [
      {
        name: "Short Bridges",
        imagePrompt: "Person lying on back with knees bent, lifting hips off ground",
        performance: [
          "Lie on back, knees bent, feet flat",
          "Lift hips until body forms straight line",
          "Squeeze glutes at top",
          "Lower with control",
          "Shoulders stay on ground"
        ],
        wisdom: "Build your foundation before you build your empire.",
        masterGoal: "3 sets of 50 reps"
      },
      {
        name: "Straight Bridges",
        imagePrompt: "Person in bridge position with legs extended straight",
        performance: [
          "Lie on back, legs straight",
          "Push hips up",
          "Only shoulders and heels on ground",
          "Body straight from shoulders to heels",
          "Hold and lower"
        ],
        wisdom: "Straight body, strong spine.",
        masterGoal: "3 sets of 40 reps"
      },
      {
        name: "Angled Bridges",
        imagePrompt: "Person in bridge position with feet elevated on platform",
        performance: [
          "Shoulders on ground, feet on bench",
          "Push hips to ceiling",
          "Create straight line",
          "Squeeze glutes hard",
          "Control the descent"
        ],
        wisdom: "Every angle conquered strengthens the chain.",
        masterGoal: "3 sets of 30 reps"
      },
      {
        name: "Head Bridges",
        imagePrompt: "Person in bridge position with top of head on ground, hands supporting",
        performance: [
          "Lie on back, knees bent",
          "Place top of head on ground",
          "Hands beside head for support",
          "Push hips up",
          "Most weight on feet and hands"
        ],
        wisdom: "Use your head, strengthen your neck.",
        masterGoal: "2 sets of 25 reps"
      },
      {
        name: "Half Bridges",
        imagePrompt: "Person in partial back bridge position with hands and head supporting",
        performance: [
          "Lie on back, place hands by ears",
          "Top of head on ground",
          "Push up into half bridge",
          "Hips elevated, back arched",
          "Lower with control"
        ],
        wisdom: "Half the bridge, twice the courage.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Full Bridges",
        imagePrompt: "Person in complete bridge position, fully arched with hands and feet on ground",
        performance: [
          "Start lying on back",
          "Hands by ears, fingers pointing toward feet",
          "Feet flat near glutes",
          "Push up into full arch",
          "Straighten arms and legs"
        ],
        wisdom: "The full bridge: where flexibility meets strength.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Wall Walking Bridges (Down)",
        imagePrompt: "Person standing facing away from wall, walking hands down wall into bridge",
        performance: [
          "Stand with back to wall",
          "Reach arms overhead",
          "Walk hands down wall",
          "Lower into bridge position",
          "Control every inch"
        ],
        wisdom: "Down the wall, up the ladder of mastery.",
        masterGoal: "2 sets of 10 reps"
      },
      {
        name: "Wall Walking Bridges (Up)",
        imagePrompt: "Person in bridge position walking hands up wall to standing",
        performance: [
          "Start in floor bridge",
          "Walk hands up wall",
          "Come to standing position",
          "Then walk back down",
          "Complete round trip"
        ],
        wisdom: "What goes down must come up stronger.",
        masterGoal: "2 sets of 8 reps"
      },
      {
        name: "Closing Bridges",
        imagePrompt: "Person in bridge position bringing hands and feet closer together",
        performance: [
          "Full bridge position",
          "Walk hands toward feet",
          "Walk feet toward hands",
          "Create tight arch",
          "Hold and reverse"
        ],
        wisdom: "Close the distance, expand the strength.",
        masterGoal: "2 sets of 6 reps"
      },
      {
        name: "Stand-to-Stand Bridges",
        imagePrompt: "Person performing bridge from standing, going down and back up without support",
        performance: [
          "Stand tall, reach back",
          "Drop into full bridge",
          "Push back to standing",
          "No wall support",
          "Pure strength and control"
        ],
        wisdom: "From standing to standing, master of your domain.",
        masterGoal: "2 sets of 30 reps"
      }
    ]
  },
  handstands: {
    name: "Handstands",
    steps: [
      {
        name: "Wall Headstands",
        imagePrompt: "Person in headstand position against wall with hands and head forming tripod",
        performance: [
          "Kneel facing wall",
          "Place hands and head in triangle",
          "Walk feet up wall",
          "Most weight on hands, not head",
          "Hold steady position"
        ],
        wisdom: "The world looks different upside down.",
        masterGoal: "2 minutes"
      },
      {
        name: "Crow Stands",
        imagePrompt: "Person in crow pose with knees on elbows, balancing on hands",
        performance: [
          "Squat down, hands flat",
          "Place knees on elbows",
          "Lean forward, lift feet",
          "Balance on hands",
          "Hold position steady"
        ],
        wisdom: "Like a crow, perch with confidence.",
        masterGoal: "2 minutes"
      },
      {
        name: "Wall Handstands",
        imagePrompt: "Person in full handstand against wall, body straight and vertical",
        performance: [
          "Face away from wall",
          "Kick up to handstand",
          "Heels touch wall",
          "Body completely straight",
          "Hold perfect alignment"
        ],
        wisdom: "The wall is your friend, for now.",
        masterGoal: "2 minutes"
      },
      {
        name: "Half Handstand Push-ups",
        imagePrompt: "Person doing handstand against wall, lowering halfway down",
        performance: [
          "Handstand against wall",
          "Lower until head halfway to ground",
          "Push back to start",
          "Control the movement",
          "No momentum"
        ],
        wisdom: "Halfway down, all the way strong.",
        masterGoal: "2 sets of 20 reps"
      },
      {
        name: "Handstand Push-ups",
        imagePrompt: "Person in wall handstand lowering head to ground and pressing back up",
        performance: [
          "Perfect wall handstand",
          "Lower until head touches ground",
          "Press back to full lockout",
          "Straight body throughout",
          "Controlled reps"
        ],
        wisdom: "Push-ups were just the warmup.",
        masterGoal: "2 sets of 15 reps"
      },
      {
        name: "Close Handstand Push-ups",
        imagePrompt: "Person doing handstand push-ups with hands close together",
        performance: [
          "Wall handstand, hands close",
          "8-12 inches apart",
          "Full range push-ups",
          "Head to ground and back",
          "Maximum tricep engagement"
        ],
        wisdom: "Narrow base, expanded power.",
        masterGoal: "2 sets of 12 reps"
      },
      {
        name: "Uneven Handstand Push-ups",
        imagePrompt: "Person doing handstand push-ups with one hand on basketball",
        performance: [
          "One hand on basketball",
          "Other hand on floor",
          "Full handstand push-ups",
          "Uneven but controlled",
          "Alternate sides"
        ],
        wisdom: "Balance in imbalance.",
        masterGoal: "2 sets of 10 reps each side"
      },
      {
        name: "1/2 One-Arm Handstand Push-ups",
        imagePrompt: "Person in handstand with one arm doing most of work, other providing minimal support",
        performance: [
          "Wall handstand",
          "Shift weight to one arm",
          "Other arm light support",
          "Lower and press with working arm",
          "Minimal assistance"
        ],
        wisdom: "The support arm is becoming obsolete.",
        masterGoal: "2 sets of 8 reps each arm"
      },
      {
        name: "Lever Handstand Push-ups",
        imagePrompt: "Person doing one-arm handstand push-up with free arm extended out to side",
        performance: [
          "One-arm handstand position",
          "Free arm out to side for balance",
          "Lower head to ground",
          "Press up with one arm",
          "Perfect control required"
        ],
        wisdom: "One arm pressing, one arm dreaming.",
        masterGoal: "2 sets of 6 reps each arm"
      },
      {
        name: "One-Arm Handstand Push-ups",
        imagePrompt: "Person performing perfect one-arm handstand push-up with free arm behind back",
        performance: [
          "One-arm handstand",
          "Free arm behind back or hanging",
          "Lower head to ground",
          "Press to full lockout",
          "Zero assistance, perfect form"
        ],
        wisdom: "Master Step. You defy gravity itself.",
        masterGoal: "1 set of 5 reps each arm"
      }
    ]
  }
};