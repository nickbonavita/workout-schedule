document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const workoutCards = document.querySelectorAll('.workout-card');
    const body = document.body;
    let exerciseModal = document.getElementById('exercise-modal');
    let exerciseClose = document.getElementById('exercise-close');

    let exerciseTitle = document.getElementById('exercise-title');
    let exercisePrimary = document.getElementById('exercise-primary');
    let exerciseSecondary = document.getElementById('exercise-secondary');
    let exerciseTertiary = document.getElementById('exercise-tertiary');
    let exerciseHowTo = document.getElementById('exercise-howto');
    let exerciseImages = document.getElementById('exercise-images');

    function ensureModalElements() {
        if (!exerciseModal) {
            const modalMarkup = `
                <div id="exercise-modal" class="exercise-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="exercise-title">
                    <div class="exercise-modal-card">
                        <button id="exercise-close" class="exercise-close" type="button" aria-label="Close exercise details">×</button>
                        <h2 id="exercise-title">Exercise Title</h2>
                        <div class="exercise-line"><strong>Primary:</strong> <span id="exercise-primary"></span></div>
                        <div class="exercise-line"><strong>Secondary:</strong> <span id="exercise-secondary"></span></div>
                        <div class="exercise-line"><strong>Tertiary:</strong> <span id="exercise-tertiary"></span></div>
                        <h3>How to perform</h3>
                        <p id="exercise-howto"></p>
                        <h3>Image examples</h3>
                        <div id="exercise-images" class="exercise-images"></div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalMarkup);

            exerciseModal = document.getElementById('exercise-modal');
            exerciseClose = document.getElementById('exercise-close');
            exerciseTitle = document.getElementById('exercise-title');
            exercisePrimary = document.getElementById('exercise-primary');
            exerciseSecondary = document.getElementById('exercise-secondary');
            exerciseTertiary = document.getElementById('exercise-tertiary');
            exerciseHowTo = document.getElementById('exercise-howto');
            exerciseImages = document.getElementById('exercise-images');
        }
    }

    ensureModalElements();

        /*
            EDIT EXERCISE DATA HERE
            - muscles.primary / secondary / tertiary: text shown in the modal
            - howTo: short step-by-step form cues
            - images: add image URLs, e.g. ["https://.../img1.jpg", "https://.../img2.jpg"]
        */
    const EXERCISE_DETAILS = {
        'Bench Press': {
            muscles: { primary: 'Pectoralis Major (Chest)', secondary: 'Anterior Deltoid (Front Shoulder)', tertiary: 'Triceps Brachii (Back of Upper Arm)' },
            howTo: 'Lie on a flat bench with feet planted. Lower the bar to mid-chest under control, press up by driving through chest and triceps, and keep shoulders packed throughout.',
            images: ["https://training.fit/wp-content/uploads/2019/07/bankdruecken-kurzhantel-flachbank.png"]
        },
        'Incline Dumbbell Press': {
            muscles: { primary: 'Clavicular Pectoralis Major (Upper Chest)', secondary: 'Anterior Deltoid (Front Shoulder)', tertiary: 'Triceps Brachii (Back of Upper Arm)' },
            howTo: 'Set bench to a slight incline. Start dumbbells at chest level, press upward and slightly inward, then lower slowly to maintain tension on the upper chest.',
            images: ["https://training.fit/wp-content/uploads/2020/02/bankdruecken-kurzhantel-schraeg-800x448.png"]
        },
        'Peck Deck': {
            muscles: { primary: 'Pectoralis Major (Chest)', secondary: 'Anterior Deltoid (Front Shoulder)', tertiary: 'Serratus Anterior (Ribcage Stabilizer)' },
            howTo: 'Adjust seat so handles align with chest. Bring handles together in an arc while keeping a soft bend in elbows, then return slowly to a controlled stretch.',
            images: ["https://training.fit/wp-content/uploads/2020/02/butterflys.png"]
        },
        'Tricep Rope Pushdown': {
            muscles: { primary: 'Triceps Brachii (Back of Upper Arm)', secondary: 'Anconeus (Elbow Extensor)', tertiary: 'Rectus Abdominis and Obliques (Core Stabilizers)' },
            howTo: 'Stand tall with elbows pinned near your sides. Push the rope down and slightly apart at the bottom, then return with control without letting elbows drift forward.',
            images: ["https://training.fit/wp-content/uploads/2020/03/trizepsdruecken-kabelzug.png"]
        },
        Dips: {
            muscles: { primary: 'Triceps Brachii (Back of Upper Arm)', secondary: 'Pectoralis Major (Chest)', tertiary: 'Anterior Deltoid (Front Shoulder)' },
            howTo: 'Support body on parallel bars, lower until elbows reach about 90 degrees, then press back up. Keep shoulders depressed and avoid shrugging at the top.',
            images: ["https://training.fit/wp-content/uploads/2020/02/dips.png"]
        },
        'Pull-ups': {
            muscles: { primary: 'Latissimus Dorsi (Lats)', secondary: 'Biceps Brachii (Front Upper Arm)', tertiary: 'Rhomboids (Upper Back)' },
            howTo: 'Hang from the bar with active shoulders, pull chest toward the bar by driving elbows down, and lower in a controlled manner to full extension.',
            images: ["https://training.fit/wp-content/uploads/2020/03/klimmzuege-latgriff.png"]
        },
        'Cable Rows': {
            muscles: { primary: 'Latissimus Dorsi (Lats)', secondary: 'Rhomboids (Upper Back)', tertiary: 'Biceps Brachii (Front Upper Arm)' },
            howTo: 'Sit tall with neutral spine, pull handle to lower ribs while squeezing shoulder blades together, then extend arms forward under control.',
            images: ["https://training.fit/wp-content/uploads/2020/02/rudern-kabelzug.png"]
        },
        'Lat Pull Down': {
            muscles: { primary: 'Latissimus Dorsi (Lats)', secondary: 'Biceps Brachii (Front Upper Arm)', tertiary: 'Rhomboids (Upper Back)' },
            howTo: 'Grip bar slightly wider than shoulders. Pull bar to upper chest by driving elbows down and back, pause briefly, then return to full stretch.',
            images: ["https://training.fit/wp-content/uploads/2020/02/latzug.png"]
        },
        'Face Pulls': {
            muscles: { primary: 'Posterior Deltoid (Rear Shoulder)', secondary: 'Trapezius (Upper/Mid Traps)', tertiary: 'Rhomboids (Upper Back)' },
            howTo: 'Set rope at upper-chest to face level. Pull rope toward your nose/forehead with elbows high, externally rotating at the end range.',
            images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJqQblZ7ituMk7w_aCopAeSdpUUJVdegrhQ&s"]
        },
        'Standing Bicep Curls': {
            muscles: { primary: 'Biceps Brachii (Front Upper Arm)', secondary: 'Brachialis (Deep Elbow Flexor)', tertiary: 'Brachioradialis (Forearm)' },
            howTo: 'Stand upright with elbows near sides. Curl weight by flexing elbows without swinging torso, then lower slowly to full extension.',
            images: ["https://training.fit/wp-content/uploads/2018/12/bizepscurls.png"]
        },
        'Leg Press': {
            muscles: { primary: 'Quadriceps (Front Thigh)', secondary: 'Gluteus Maximus (Glutes)', tertiary: 'Hamstrings (Back Thigh)' },
            howTo: 'Place feet shoulder-width on platform. Lower sled until knees are bent comfortably, then press through full foot without locking knees aggressively.',
            images: ["https://training.fit/wp-content/uploads/2020/03/beinpresse.png"]
        },
        'Leg Extension': {
            muscles: { primary: 'Quadriceps (Front Thigh)', secondary: 'Vastus Medialis (Inner Quad)', tertiary: 'Vastus Lateralis (Outer Quad)' },
            howTo: 'Align knee joint with machine pivot. Extend legs to near straight with control, squeeze quads briefly, then lower slowly to start.',
            images: ["https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png"]
        },
        'Leg Curl': {
            muscles: { primary: 'Hamstrings (Back Thigh)', secondary: 'Gastrocnemius (Calf)', tertiary: 'Gluteus Maximus (Glutes)' },
            howTo: 'Set pad just above heels. Curl heels toward glutes while keeping hips stable, then return slowly to full stretch.',
            images: ["https://anabolicaliens.com/cdn/shop/articles/5fd7d1877ec308ebe3f92223_seated-hamstring-curl.png?v=1641744558"]
        },
        'Calf Raises': {
            muscles: { primary: 'Gastrocnemius (Calf)', secondary: 'Soleus (Deep Calf)', tertiary: 'Tibialis Posterior (Ankle Stabilizer)' },
            howTo: 'Rise onto the balls of your feet with full ankle extension, pause at the top, and lower slowly below neutral for a complete stretch.',
            images: ["https://training.fit/wp-content/uploads/2020/03/wadenheben-stufen.png"]
        },
        Running: {
            muscles: { primary: 'Quadriceps (Front Thigh)', secondary: 'Hamstrings (Back Thigh)', tertiary: 'Gluteus Maximus and Medius (Glutes)' },
            howTo: 'Maintain tall posture, slight forward lean, and quick, light steps. Keep breathing rhythmic and pace controlled for your training goal.',
            images: []
        },
        Cycling: {
            muscles: { primary: 'Quadriceps (Front Thigh)', secondary: 'Gluteus Maximus (Glutes)', tertiary: 'Hamstrings (Back Thigh)' },
            howTo: 'Set seat height so knee is slightly bent at the bottom of the pedal stroke. Drive evenly through each leg while maintaining steady cadence.',
            images: []
        },
        Stairmaster: {
            muscles: { primary: 'Quadriceps (Front Thigh)', secondary: 'Gluteus Maximus (Glutes)', tertiary: 'Hamstrings (Back Thigh)' },
            howTo: 'Keep chest up and avoid leaning heavily on rails. Step through full foot contact and maintain a sustainable pace for target duration.',
            images: []
        },
        Swimming: {
            muscles: { primary: 'Latissimus Dorsi and Deltoids (Back/Shoulders)', secondary: 'Rectus Abdominis and Obliques (Core)', tertiary: 'Quadriceps and Glutes (Kick Drive)' },
            howTo: 'Streamline body position, coordinate breathing with stroke rhythm, and focus on long, efficient pulls while kicking steadily.',
            images: []
        },
        Planks: {
            muscles: { primary: 'Transverse Abdominis (Deep Core)', secondary: 'Rectus Abdominis (Abs)', tertiary: 'Erector Spinae (Lower Back)' },
            howTo: 'Hold a straight line from shoulders to heels with elbows under shoulders. Brace core and glutes while breathing steadily.',
            images: []
        },
        Crunches: {
            muscles: { primary: 'Rectus Abdominis (Abs)', secondary: 'Obliques (Side Abs)', tertiary: 'Iliopsoas (Hip Flexors)' },
            howTo: 'Lie on your back with knees bent, lift shoulder blades off floor by curling torso, then lower slowly without pulling on your neck.',
            images: []
        },
        'Hanging Leg Raises': {
            muscles: { primary: 'Lower Rectus Abdominis (Lower Abs)', secondary: 'Iliopsoas (Hip Flexors)', tertiary: 'Obliques (Side Abs)' },
            howTo: 'Hang with active shoulders, raise legs by flexing hips and bracing core, then lower under control without swinging.',
            images: []
        },
        'Russian Twists': {
            muscles: { primary: 'Obliques (Side Abs)', secondary: 'Rectus Abdominis (Abs)', tertiary: 'Transverse Abdominis (Deep Core)' },
            howTo: 'Sit with torso slightly reclined, brace core, and rotate shoulders side to side while keeping movement controlled and balanced.',
            images: []
        }
    };

    function setBodyBg(tabName) {
        body.classList.remove('push-active', 'pull-active', 'legs-active', 'cardio-active', 'core-active');
        const bgClass = tabName + '-active';
        body.classList.add(bgClass);
    }

    function getFallbackMuscles(card) {
        const muscleText = card.querySelector('.muscle-groups')?.textContent || '';
        const muscleParts = muscleText.split(',').map((item) => item.trim()).filter(Boolean);

        return {
            primary: muscleParts[0] || 'Add primary muscle',
            secondary: muscleParts[1] || 'Add secondary muscle',
            tertiary: muscleParts[2] || 'Add tertiary muscle'
        };
    }

    function setImageArea(title, images) {
        exerciseImages.innerHTML = '';

        if (images.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'exercise-image-placeholder';
            placeholder.textContent = `Add image URLs in EXERCISE_DETAILS["${title}"].images`;
            exerciseImages.appendChild(placeholder);
            return;
        }

        images.forEach((imageUrl, index) => {
            const imageElement = document.createElement('img');
            imageElement.className = 'exercise-image';
            imageElement.src = imageUrl;
            imageElement.alt = `${title} example ${index + 1}`;
            imageElement.loading = 'lazy';
            exerciseImages.appendChild(imageElement);
        });
    }

    function openExerciseModal(card) {
        const title = card.querySelector('h2')?.textContent?.trim() || 'Exercise';
        const detail = EXERCISE_DETAILS[title] || {};
        const muscles = detail.muscles || getFallbackMuscles(card);

        exerciseTitle.textContent = title;
        exercisePrimary.textContent = muscles.primary || 'Add primary muscle';
        exerciseSecondary.textContent = muscles.secondary || 'Add secondary muscle';
        exerciseTertiary.textContent = muscles.tertiary || 'Add tertiary muscle';

        exerciseHowTo.textContent = detail.howTo || 'Add how-to instructions in EXERCISE_DETAILS for this exercise.';
        setImageArea(title, detail.images || []);

        exerciseModal.classList.add('open');
        exerciseModal.setAttribute('aria-hidden', 'false');
    }

    function closeExerciseModal() {
        exerciseModal.classList.remove('open');
        exerciseModal.setAttribute('aria-hidden', 'true');
    }

    const initialActiveTabButton = document.querySelector('.tab-button.active');
    if (initialActiveTabButton) {
        const initialTab = initialActiveTabButton.getAttribute('data-tab');
        setBodyBg(initialTab);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            setBodyBg(tabName);
        });
    });

    workoutCards.forEach((card) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${card.querySelector('h2')?.textContent?.trim() || 'exercise'}`);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openExerciseModal(card);
            }
        });
    });

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.workout-card');
        if (card) {
            openExerciseModal(card);
        }
    });

    if (exerciseClose) {
        exerciseClose.addEventListener('click', closeExerciseModal);
    }

    if (exerciseModal) {
        exerciseModal.addEventListener('click', (event) => {
            if (event.target === exerciseModal) {
                closeExerciseModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && exerciseModal.classList.contains('open')) {
            closeExerciseModal();
        }
    });
});
