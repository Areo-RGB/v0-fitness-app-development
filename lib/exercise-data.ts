export interface Exercise {
  id: number
  germanName: string
  englishName: string
  description: string
  reps?: number
  duration?: number
  sets?: number
  focusPoints?: string[]
  requiresPartner?: boolean
  videoKey?: string
  levels?: {
    description: string
    reps?: number
    duration?: number
    sets?: number
    focusPoints?: string[]
    videoKey?: string
  }[]
}

export interface Phase {
  id: number
  title: string
  description: string
  totalDuration: number
  exercises: Exercise[]
}

export const exerciseData: Phase[] = [
  {
    id: 1,
    title: "Laufübungen (Running Exercises)",
    description: "Dynamic warm-up and mobility drills",
    totalDuration: 480, // 8 minutes
    exercises: [
      {
        id: 1,
        germanName: "LAUFEN GERADEAUS",
        englishName: "Running Straight Ahead",
        description:
          "Run from the first marker to the last (6-10 markers, 5-6 m apart). Run outward on the way there, and inward on the way back. Start slow/warm-up pace and increase on the return trip.",
        reps: 2,
        sets: 1,
        focusPoints: ["Start slow and gradually increase pace", "Maintain proper running form"],
        videoKey: "LAUFEN_GERADEAUS",
      },
      {
        id: 2,
        germanName: "LAUFEN HÜFTDREHUNG NACH AUSSEN",
        englishName: "Hip Rotation Outward",
        description:
          "Walk/jog to the first marker and stop. Lift the knee forward, rotate the knee outward, and set the leg down. Repeat with the other leg at the next marker.",
        reps: 2,
        sets: 1,
        focusPoints: ["Control the hip rotation movement", "Maintain balance throughout"],
        videoKey: "LAUFEN_HUEFTDREHUNG_NACH_AUSSEN",
      },
      {
        id: 3,
        germanName: "LAUFEN HÜFTDREHUNG NACH INNEN",
        englishName: "Hip Rotation Inward",
        description:
          "Walk/jog to the first marker and stop. Lift the knee sideways, rotate the knee forward, and set the leg down. Repeat with the other leg at the next marker.",
        reps: 2,
        sets: 1,
        focusPoints: ["Control the hip rotation movement", "Maintain balance throughout"],
        videoKey: "LAUFEN_HUEFTDREHUNG_NACH_INNEN",
      },
      {
        id: 4,
        germanName: "LAUFEN SEITGALOPP",
        englishName: "Sideways Gallop (Around Partner)",
        description:
          "Run to the first marker. Perform a lateral gallop toward a partner, go around the partner (without changing gaze/direction of view), and return to the starting marker.",
        reps: 2,
        sets: 1,
        requiresPartner: true,
        focusPoints: ["Body weight on the forefoot", "Hips and knees slightly bent", "Maintain low center of gravity"],
        videoKey: "LAUFEN_SEITGALOPP",
      },
      {
        id: 5,
        germanName: "LAUFEN SCHULTERKONTAKT",
        englishName: "Shoulder Contact",
        description:
          "Run to the first marker. Perform a lateral gallop toward a partner. Jump sideways against each other in the middle so the shoulders touch.",
        reps: 2,
        sets: 1,
        requiresPartner: true,
        focusPoints: [
          "Must land on both feet with bent hips and knees",
          "Knees must NOT buckle inward",
          "Jump and land simultaneously with partner",
        ],
        videoKey: "LAUFEN_SCHULTERKONTAKT",
      },
      {
        id: 6,
        germanName: "LAUFEN VOR UND ZURÜCK SPRINTEN",
        englishName: "Forward and Backward Sprint",
        description:
          "Sprint forward to the second marker, then sprint backward to the first marker (maintain slightly bent hips/knees). Repeat: sprint two markers forward, one marker backward, continuing the circuit.",
        reps: 2,
        sets: 1,
        focusPoints: ["Use small, quick steps", "Maintain slight bend in hips and knees when running backward"],
        videoKey: "LAUFEN_VOR_UND_ZURUECK_SPRINTEN",
      },
    ],
  },
  {
    id: 2,
    title: "Kraft · Plyometrie · Gleichgewicht",
    description: "Core stability, eccentric strength, balance training, and plyometrics",
    totalDuration: 600, // 10 minutes
    exercises: [
      {
        id: 7,
        germanName: "UNTERARMSTÜTZ",
        englishName: "Plank",
        description: "Standard forearm plank. Elbows directly under shoulders. Maintain a straight line.",
        focusPoints: ["Do not allow the back to sag", "Maintain straight line from head to heels"],
        levels: [
          {
            description: "Standard forearm plank hold",
            duration: 25,
            sets: 3,
            videoKey: "UNTERARMSTUETZ_LEVEL_1_STATISCH_HALTEN",
          },
          {
            description: "Standard plank position. Alternately lift each leg for approx. 2 seconds. Keep hips stable.",
            duration: 50,
            sets: 3,
            videoKey: "UNTERARMSTUETZ_LEVEL_2_BEINE_ABWECHSELND_ANHEBEN",
          },
          {
            description: "Standard plank position. Lift one leg approx. 10-15 cm off the floor.",
            duration: 25,
            sets: 3,
            focusPoints: ["Do not let the opposite hip tilt downward", "Perform on each leg"],
            videoKey: "UNTERARMSTUETZ_LEVEL_3_EINBEINIGES_HALTEN",
          },
        ],
      },
      {
        id: 8,
        germanName: "SEITLICHER UNTERARMSTÜTZ",
        englishName: "Side Plank",
        description: "Side plank on forearm, supporting on forearm and leg.",
        focusPoints: ["Maintain straight line from shoulder to foot"],
        levels: [
          {
            description:
              "Side plank on forearm, bottom knee bent at right angle, supporting on forearm and bottom leg. Lift hip/upper body to form straight line.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side"],
            videoKey: "SEITLICHER_UNTERARMSTUETZ_LEVEL_1_STATISCH_HALTEN",
          },
          {
            description:
              "Side plank on forearm, both legs straight. Lower the hip toward the floor and raise it again.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side", "Maintain straight line from shoulder to foot"],
            videoKey: "SEITLICHER_UNTERARMSTUETZ_LEVEL_2_HUEFTE_HEBEN_UND_SENKEN",
          },
          {
            description: "Side plank on forearm, both legs straight. Slowly raise and lower the upper leg.",
            duration: 25,
            sets: 3,
            focusPoints: ["Perform on each side", "Control the leg movement"],
            videoKey: "SEITLICHER_UNTERARMSTUETZ_LEVEL_3_MIT_BEINHEBEN",
          },
        ],
      },
      {
        id: 9,
        germanName: "OBERSCHENKELRÜCKSEITE",
        englishName: "Nordic Hamstring Curls",
        description:
          "Partner holds lower legs firmly against the ground. Maintain straight line from shoulders to knees throughout. Lower body slowly forward, resisting with hamstrings/glutes.",
        requiresPartner: true,
        focusPoints: [
          "Maintain straight line from shoulders to knees",
          "Lower slowly with control",
          "Catch weight with hands when resistance fails",
        ],
        levels: [
          {
            description: "Beginner level Nordic hamstring curls",
            reps: 5,
            sets: 1,
            videoKey: "OBERSCHENKELRUECKSEITE_LEVEL_1",
          },
          {
            description: "Intermediate level Nordic hamstring curls",
            reps: 8,
            sets: 1,
            videoKey: "OBERSCHENKELRUECKSEITE_LEVEL_2",
          },
          {
            description: "Advanced level Nordic hamstring curls",
            reps: 13,
            sets: 1,
            videoKey: "OBERSCHENKELRUECKSEITE_LEVEL_3",
          },
        ],
      },
      {
        id: 10,
        germanName: "EINBEINSTAND",
        englishName: "Single Leg Balance",
        description: "Stand on one slightly bent leg. Focus on balance and stability.",
        focusPoints: ["Weight on the forefoot", "Knee must NOT buckle inward"],
        levels: [
          {
            description:
              "Stand on one slightly bent leg. Hold a ball in two hands in front of the body. Increase difficulty by circling the ball around the hip and/or free knee.",
            duration: 30,
            sets: 2,
            focusPoints: ["Perform on each leg", "Weight on the forefoot", "Knee must NOT buckle inward"],
            videoKey: "EINBEINSTAND_LEVEL_1_BALL_HALTEN",
          },
          {
            description:
              "Two players face each other (2-3m distance) standing on one leg. Throw a ball back and forth.",
            duration: 30,
            sets: 2,
            requiresPartner: true,
            focusPoints: ["Perform on each leg", "Abs tight", "Knee only slightly bent, must NOT buckle inward"],
            videoKey: "EINBEINSTAND_LEVEL_2_BALL_MIT_PARTNER_WERFEN",
          },
          {
            description:
              "Two players face each other (arm's length apart) standing on one leg. Partners alternate attempting to push the other off balance in various directions.",
            duration: 30,
            sets: 2,
            requiresPartner: true,
            focusPoints: ["Perform on each leg", "Knee must NOT buckle inward"],
            videoKey: "EINBEINSTAND_LEVEL_3_PARTNER_TESTEN",
          },
        ],
      },
      {
        id: 11,
        germanName: "KNIEBEUGEN",
        englishName: "Squats/Lunges",
        description: "Various squatting and lunging movements for leg strength.",
        focusPoints: ["Knees must NOT buckle inward"],
        levels: [
          {
            description:
              "Stand hip-width apart. Slowly bend hips, knees, and ankles until knees form right angle. Quickly stretch up onto the toes, then slowly return.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Control the movement"],
            videoKey: "KNIEBEUGEN_LEVEL_1_MIT_ZEHENHEBEN",
          },
          {
            description:
              "Perform slow, steady forward lunges. Front knee forms a right angle. Cross the field (approx. 10 steps per leg), then jog back to recover.",
            reps: 2,
            sets: 1,
            focusPoints: ["Knees must NOT buckle inward", "Torso/hips must not tilt sideways"],
            videoKey: "KNIEBEUGEN_LEVEL_2_AUSFALLSCHRITTE_IM_GEHEN",
          },
          {
            description:
              "Stand on one leg (lightly hold onto partner for balance). Slowly bend the knee as far as possible (up to 90 degrees). Bend slowly, stretch slightly faster.",
            reps: 10,
            sets: 2,
            focusPoints: ["Perform on each leg", "Torso and hip must not tilt sideways"],
            videoKey: "KNIEBEUGEN_LEVEL_3_EINBEINIGE_KNIEBEUGEN",
          },
        ],
      },
      {
        id: 12,
        germanName: "SPRINGEN",
        englishName: "Jumping/Plyometrics",
        description: "Various jumping exercises for power and landing mechanics.",
        focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
        levels: [
          {
            description:
              "Squat slowly as if sitting on a chair (knees at right angle). Hold for 2 sec. Jump as high as possible. Land softly on forefoot, keeping hips and knees slightly bent.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
            videoKey: "SPRINGEN_LEVEL_1_VERTIKALE_SPRUENGE",
          },
          {
            description:
              "Stand on one leg, upper body slightly leaning forward. Jump approx. 1m sideways onto the other leg. Land softly on forefoot, maintaining slight hip/knee bend and balance.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot"],
            videoKey: "SPRINGEN_LEVEL_2_SEITLICHE_SPRUENGE",
          },
          {
            description:
              "Stand in center of imagined cross on floor. Jump alternately forward, backward, sideways, and diagonally over the cross. Jump quickly and explosively.",
            duration: 30,
            sets: 2,
            focusPoints: ["Knees must NOT buckle inward", "Land softly on forefoot", "Jump quickly and explosively"],
            videoKey: "SPRINGEN_LEVEL_3_KASTENSPRUENGE",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Laufübungen (Running Exercises)",
    description: "High-intensity running drills and injury-preventing change-of-direction mechanics",
    totalDuration: 480, // 8 minutes
    exercises: [
      {
        id: 13,
        germanName: "LAUFEN ÜBER DAS SPIELFELD",
        englishName: "Run Across the Field",
        description: "Run from one side of the field to the other at 75-80% of maximal speed.",
        reps: 2,
        sets: 1,
        focusPoints: ["Target speed: 75-80% of maximal speed", "Maintain good running form"],
        videoKey: "LAUFEN_UEBER_DAS_SPIELFELD",
      },
      {
        id: 14,
        germanName: "LAUFEN HOCH-WEIT-SPRÜNGE",
        englishName: "Bounding/High-Long Jumps",
        description:
          "Run with high and long jumps (bounding). Bring the swinging knee as high as possible and the opposing arm forward. Land softly on the forefoot. Cross the entire field, jog back to recover.",
        reps: 2,
        sets: 1,
        focusPoints: [
          "Knees must NOT buckle inward",
          "Land softly on forefoot",
          "Bring knee high with opposing arm forward",
        ],
        videoKey: "LAUFEN_HOCH_WEIT_SPRUENGE",
      },
      {
        id: 15,
        germanName: "LAUFEN RICHTUNGSWECHSEL",
        englishName: "Change of Direction Drill",
        description:
          "4-5 steps running, then quick change of direction left (plant & cut) after planting right foot. Accelerate for 5-7 steps (sprint 80-90% max speed), reduce tempo, then change direction right. Cross field, jog back to recover.",
        reps: 2,
        sets: 1,
        focusPoints: ["Knees must NOT buckle inward", "Plant and cut with control", "Sprint at 80-90% max speed"],
        videoKey: "LAUFEN_RICHTUNGSWECHSEL",
      },
    ],
  },
]

export const stretchRoutineData: Phase[] = [
  {
    id: 4,
    title: "Flexibility & Mobility Routine",
    description: "Complete stretching routine for improved flexibility and recovery",
    totalDuration: 690, // 23 exercises × 30 seconds each
    exercises: [
      {
        id: 101,
        germanName: "CHILD'S POSE",
        englishName: "Child's Pose",
        description:
          "Kneel on the floor, touch your big toes together and sit back on your heels. Separate your knees about hip-width apart. Fold forward, extending your arms in front of you and resting your forehead on the ground.",
        duration: 30,
        sets: 1,
        focusPoints: [
          "Breathe deeply and relax into the stretch",
          "Keep your arms extended and forehead down",
          "Feel the stretch in your back and shoulders",
        ],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759149953/Stretch/c8sdairlonfzjadqigxx.mp4",
      },
      {
        id: 102,
        germanName: "SEAL STRETCH",
        englishName: "Seal Stretch",
        description:
          "Lie on your stomach and push up with your arms, keeping your hips on the ground. Look up and arch your back gently.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips pressed to the ground", "Gentle arch in the back", "Look up to increase the stretch"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759149966/Stretch/uxhe1xszon7hj0bvt8fu.mp4",
      },
      {
        id: 103,
        germanName: "CHILD'S POSE WITH LEFT TWIST",
        englishName: "Child's Pose with Left Twist",
        description:
          "From child's pose, walk your hands to the left side, feeling a stretch along your right side body.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips centered", "Feel the stretch along your side", "Breathe deeply"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759149984/Stretch/mxwjhekkolbhkq2ab9lb.mp4",
      },
      {
        id: 104,
        germanName: "CHILD'S POSE WITH RIGHT TWIST",
        englishName: "Child's Pose with Right Twist",
        description:
          "From child's pose, walk your hands to the right side, feeling a stretch along your left side body.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips centered", "Feel the stretch along your side", "Breathe deeply"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759149992/Stretch/sjnltvrcmjbvggzsg39v.mp4",
      },
      {
        id: 105,
        germanName: "SEAL STRETCH",
        englishName: "Seal Stretch",
        description:
          "Lie on your stomach and push up with your arms, keeping your hips on the ground. Look up and arch your back gently.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips pressed to the ground", "Gentle arch in the back", "Look up to increase the stretch"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150000/Stretch/tzsmzaacsnqhdbecbafu.mp4",
      },
      {
        id: 106,
        germanName: "PIGEON STRETCH - RIGHT",
        englishName: "Pigeon Stretch - Right",
        description:
          "Bring your right knee forward and place it behind your right wrist. Extend your left leg straight back. Lower down onto your forearms.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips square", "Feel the stretch in your hip flexor", "Breathe deeply and relax"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150023/Stretch/pxmkaqjwv9lapfxnzytm.mp4",
      },
      {
        id: 107,
        germanName: "PIGEON STRETCH - LEFT",
        englishName: "Pigeon Stretch - Left",
        description:
          "Bring your left knee forward and place it behind your left wrist. Extend your right leg straight back. Lower down onto your forearms.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep hips square", "Feel the stretch in your hip flexor", "Breathe deeply and relax"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150031/Stretch/tnbagur2qgku8s1pfmj5.mp4",
      },
      {
        id: 108,
        germanName: "COUCH STRETCH - LEFT",
        englishName: "Couch Stretch - Left",
        description:
          "Place your left foot on a couch or wall behind you. Step your right foot forward into a lunge position. Keep your torso upright.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep torso upright", "Feel the stretch in your hip flexor", "Don't let your knee cave inward"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150040/Stretch/vfvcprwv6bgtd77qkq8l.mp4",
      },
      {
        id: 109,
        germanName: "COUCH STRETCH - RIGHT",
        englishName: "Couch Stretch - Right",
        description:
          "Place your right foot on a couch or wall behind you. Step your left foot forward into a lunge position. Keep your torso upright.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep torso upright", "Feel the stretch in your hip flexor", "Don't let your knee cave inward"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150058/Stretch/sueemxy0gdngkdvypi6v.mp4",
      },
      {
        id: 110,
        germanName: "CRISS CROSS AND REACH",
        englishName: "Criss Cross and Reach",
        description: "Sit with legs crossed and reach forward with both arms, feeling a stretch in your back and hips.",
        duration: 30,
        sets: 1,
        focusPoints: ["Reach forward with control", "Feel the stretch in your back", "Keep breathing steady"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150094/Stretch/qa5ol9lzuudgugyvvcqh.mp4",
      },
      {
        id: 111,
        germanName: "CRISS CROSS AND REACH - OPPOSITE",
        englishName: "Criss Cross and Reach - Opposite",
        description:
          "Sit with legs crossed in the opposite direction and reach forward with both arms, feeling a stretch in your back and hips.",
        duration: 30,
        sets: 1,
        focusPoints: ["Reach forward with control", "Feel the stretch in your back", "Keep breathing steady"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150104/Stretch/vfv2iygnbpubiwhpcqac.mp4",
      },
      {
        id: 112,
        germanName: "FROG STRETCH",
        englishName: "Frog Stretch",
        description:
          "Get on your hands and knees, then spread your knees wide apart. Lower down onto your forearms and feel the stretch in your inner thighs.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep knees wide", "Feel the stretch in your inner thighs", "Breathe deeply"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150116/Stretch/dswadlxgv1hgz0ijn6rx.mp4",
      },
      {
        id: 113,
        germanName: "QUAD STRETCH - LEFT",
        englishName: "Quad Stretch - Left",
        description:
          "Lying on your side, grab your left ankle and pull your heel toward your glutes. Feel the stretch in the front of your thigh.",
        duration: 30,
        sets: 1,
        focusPoints: ["Pull heel toward glutes", "Feel the stretch in your quadriceps", "Keep hips aligned"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150124/Stretch/akrz8xdo0wnhka2sxxa3.mp4",
      },
      {
        id: 114,
        germanName: "QUAD STRETCH - RIGHT",
        englishName: "Quad Stretch - Right",
        description:
          "Lying on your side, grab your right ankle and pull your heel toward your glutes. Feel the stretch in the front of your thigh.",
        duration: 30,
        sets: 1,
        focusPoints: ["Pull heel toward glutes", "Feel the stretch in your quadriceps", "Keep hips aligned"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150141/Stretch/mmktj5feewzhqhb9kgom.mp4",
      },
      {
        id: 115,
        germanName: "SEATED HAMSTRING",
        englishName: "Seated Hamstring",
        description:
          "Sit with one leg extended and the other bent. Reach forward toward your extended foot, feeling a stretch in your hamstring.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep your back straight", "Reach toward your toes", "Feel the stretch in your hamstring"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150163/Stretch/ycwxu1tsqirgqxqzsnrh.mp4",
      },
      {
        id: 116,
        germanName: "WIDE LEG HAMSTRING WITH LEFT TWIST",
        englishName: "Wide Leg Hamstring with Left Twist",
        description:
          "Sit with legs wide apart. Reach toward your left foot with both hands, adding a twist to target different muscle groups.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep legs wide", "Reach toward your foot", "Feel the stretch and twist"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150188/Stretch/w3qvvyeqdaun97bvrir6.mp4",
      },
      {
        id: 117,
        germanName: "WIDE LEG HAMSTRING WITH RIGHT TWIST",
        englishName: "Wide Leg Hamstring with Right Twist",
        description:
          "Sit with legs wide apart. Reach toward your right foot with both hands, adding a twist to target different muscle groups.",
        duration: 30,
        sets: 1,
        focusPoints: ["Keep legs wide", "Reach toward your foot", "Feel the stretch and twist"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150211/Stretch/vexzrfsx2sdqj1szqe7i.mp4",
      },
      {
        id: 118,
        germanName: "SIT BACK ON HEELS",
        englishName: "Sit Back on Heels",
        description: "Kneel and sit back on your heels. Feel the stretch in your shins and the tops of your feet.",
        duration: 30,
        sets: 1,
        focusPoints: ["Sit back comfortably", "Feel the stretch in your shins", "Breathe deeply"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150230/Stretch/oos8vrhnfts36rj5tsyu.mp4",
      },
      {
        id: 119,
        germanName: "DOWNWARD DOG",
        englishName: "Downward Dog",
        description:
          "Start on hands and knees, then lift your hips up and back. Straighten your legs and arms to form an inverted V shape.",
        duration: 30,
        sets: 1,
        focusPoints: [
          "Press hands firmly into ground",
          "Lift hips up and back",
          "Feel the stretch in your calves and hamstrings",
        ],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150247/Stretch/cuzl4sbbedgtequ2so7t.mp4",
      },
      {
        id: 120,
        germanName: "SIT BACK ON HEELS WITH KNEE RAISE",
        englishName: "Sit Back on Heels with Knee Raise",
        description:
          "Sit back on your heels, then lift one knee up while keeping the other foot tucked under. Alternate between sides.",
        duration: 30,
        sets: 1,
        focusPoints: ["Alternate knee raises", "Keep one foot tucked", "Feel the stretch in your shins and ankles"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150262/Stretch/usqgj1dclmg3ikqyaqzj.mp4",
      },
      {
        id: 121,
        germanName: "CALF STRETCH - LEFT",
        englishName: "Calf Stretch - Left",
        description:
          "Step your left foot back and press your heel into the ground. Keep your leg straight and lean forward to stretch your calf.",
        duration: 30,
        sets: 1,
        focusPoints: ["Press heel into ground", "Keep back leg straight", "Feel the stretch in your calf"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150278/Stretch/mt8pfl6f8zcikuzb8xu8.mp4",
      },
      {
        id: 122,
        germanName: "CALF STRETCH - RIGHT",
        englishName: "Calf Stretch - Right",
        description:
          "Step your right foot back and press your heel into the ground. Keep your leg straight and lean forward to stretch your calf.",
        duration: 30,
        sets: 1,
        focusPoints: ["Press heel into ground", "Keep back leg straight", "Feel the stretch in your calf"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150294/Stretch/zieosofbwqvbis1kznui.mp4",
      },
      {
        id: 123,
        germanName: "SIT BACK ON TOES",
        englishName: "Sit Back on Toes",
        description:
          "Kneel with your toes tucked under and sit back on your heels. Feel the stretch in the bottoms of your feet.",
        duration: 30,
        sets: 1,
        focusPoints: ["Tuck toes under", "Sit back gently", "Feel the stretch in your feet"],
        videoKey: "https://res.cloudinary.com/dwedvwkzw/video/upload/v1759150312/Stretch/srih8vxkveajgwzh4g3r.mp4",
      },
    ],
  },
]

export const allExerciseData = [...exerciseData, ...stretchRoutineData]
