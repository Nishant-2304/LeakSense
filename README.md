# LeakSense

LeakSense contains the final extracted PIGNN modules under `ml/`.

## Local Data

The Hanoi dataset is expected at:

```text
data/HanoiOK/
```

Your local zip is:

```text
C:\Users\Nisha\Downloads\Hanoi.zip
```

Extract it from the repository root with PowerShell:

```powershell
Expand-Archive -LiteralPath "C:\Users\Nisha\Downloads\Hanoi.zip" -DestinationPath data -Force
```

You can override the dataset path without moving files:

```powershell
$env:LEAKSENSE_DATA_DIR = "C:\path\to\HanoiOK"
```

## Smoke Test

After installing dependencies and extracting the dataset:

```powershell
python -m compileall ml scripts
python scripts\validate_ml_setup.py
```

The downloaded Kaggle artifacts should live at:

```text
results/pignn_checkpoint.pt
results/preprocessing.pkl
```

The network file is already available from the dataset at:

```text
data/HanoiOK/Hanoi.inp
```

Verify the saved artifacts with:

```powershell
python scripts\verify_artifacts.py --device cpu
```
