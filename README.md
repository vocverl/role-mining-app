# Role Mining Application

Een geautomatiseerde role mining applicatie die HR data (SuccessFactors), SAP GRC Access Control data en Entra ID/Active Directory data combineert om saturatie analyses uit te voeren en business role voorstellen te genereren.

## Overzicht

De Role Mining Application helpt organisaties om:
- Verborgen fabrieken in access management te identificeren
- Bedrijfsrollen te optimaliseren op basis van actuele gebruikspatronen
- Handmatige access requests te reduceren door automatisering
- Compliance en governance te verbeteren

### Het Proces (7 Stappen)

1. **Data Import** - Importeer data uit HR, SAP GRC en Active Directory
2. **Role Mining** - Analyseer saturatie niveaus per functie
3. **Proposal** - Genereer voorstellen met matrix visualisatie
4. **Validatie** - Role Owner valideert voorstellen (bottom-up → top-down)
5. **Export** - Genereer GRC import bestanden
6. **GRC Import** - Importeer in SAP GRC BRM
7. **Reprovisioning** - Provisioning naar SAP en AD systemen

## Functies

### Drie Modi

**1. Demo Modus** 🎬
- Directe demonstratie met vooraf ingeladen data
- Toont volledige functionaliteit zonder configuratie
- Perfect voor het tonen van toegevoegde waarde

**2. Upload Modus** 📤
- Upload Excel/CSV bestanden uit:
  - SuccessFactors (HR data)
  - SAP GRC Access Control (rollen en autorisaties)
  - Active Directory (groepen en memberships)
- Verwerk real-world data

**3. Live Modus** 🔴
- Live integratie met bronsystemen
- Real-time data ophalen via API's
- Automatische synchronisatie

### Saturatie Analyse

Het algoritme berekent voor elke functie de saturatie van rollen en AD groepen:

```
Saturatie = (Aantal medewerkers met rol / Totaal medewerkers in functie) × 100%
```

**Saturatie Levels:**
- 🟢 **Hoog (>80%)** - Toevoegen aan bedrijfsrol (hoogste prioriteit)
- 🟡 **Gemiddeld (60-80%)** - Overwegen voor bedrijfsrol
- 🔵 **Laag (<60%)** - Blijft individuele toewijzing

### Proposal Matrix

De proposal matrix toont:
- Functies met bijbehorende rollen
- Saturatie percentages (kleur gecodeerd)
- Impact analyse (aantal betrokken medewerkers)
- Aanbevolen acties

### Bottom-up Analyse, Top-down Beslissing

- **Bottom-up**: Algoritme analyseert actuele data en genereert voorstellen
- **Top-down**: Role Owner valideert en keurt goed/af

Dit zorgt voor data-driven beslissingen met menselijke oversight.

### Besparingen Berekenen

De applicatie berekent:
- Huidige aantal handmatige access requests
- Verwachte reductie percentage
- Besparing in uren per jaar

**Voorbeeld:**
- 100 handmatige requests per jaar
- 40% wordt automatisch via bedrijfsrollen
- Besparing: 40 × 0.5 uur = 20 uur per jaar

## Installatie & Gebruik

### Starten

1. Open `index.html` in een moderne browser
2. Kies een modus (Demo/Upload/Live)
3. Volg het 7-stappen proces

### Demo Data

De demo bevat realistische data:
- 27 medewerkers over 5 functies
- 15 SAP GRC rollen
- 6 Active Directory groepen
- Diverse saturatie niveaus

**Functies in demo:**
- Controleur Drinkwaterinstallatie (10 medewerkers)
- Procesoperator (8 medewerkers)
- Technisch Specialist (4 medewerkers)
- Financial Controller (3 medewerkers)
- HR Business Partner (2 medewerkers)

## Project Structuur

```
role-mining-app/
├── index.html              # Hoofdapplicatie
├── css/
│   └── styles.css         # Styling
├── js/
│   ├── demo-data.js       # Demo dataset
│   ├── role-mining-engine.js  # Core algoritme
│   └── app.js             # UI logica
├── data/                  # Upload directory
└── exports/               # Export directory
```

## Technische Details

### Role Mining Algoritme

**Saturatie Berekening:**
```javascript
calculateRoleSaturation(functionName, roleId) {
    const usersInFunction = hrData.filter(e => e.function === functionName);
    const usersWithRole = usersInFunction.filter(user =>
        hasRoleAssignment(user, roleId)
    );
    return (usersWithRole / usersInFunction.length) * 100;
}
```

**Opportunity Detectie:**
- Rollen met 60-100% saturatie worden als opportunity gemarkeerd
- >80% = hoge prioriteit (groen)
- 60-80% = gemiddelde prioriteit (geel)

### Export Formaten

**GRC XML:**
```xml
<BusinessRole>
    <RoleId>BR-CONTROLEUR_DWI</RoleId>
    <RoleName>Controleur Drinkwater - Auto Generated</RoleName>
    <AssignedRoles>
        <TechnicalRole>
            <RoleId>SAP_QM_INSPECTOR</RoleId>
            <Saturation>90.00%</Saturation>
        </TechnicalRole>
    </AssignedRoles>
</BusinessRole>
```

**CSV Export:**
```csv
Function,Type,Item ID,Item Name,Saturation,Affected Users,Status
"Controleur Drinkwaterinstall","SAP Role","SAP_QM_INSPECTOR","QM Quality Inspector",90.00,1,"approved"
```

## Uitbreidingen (Toekomstig)

### Upload Modus Implementatie

```javascript
// Parse Excel files
async function parseExcelFile(file, type) {
    const workbook = await readExcelFile(file);

    if (type === 'sf') {
        return parseSuccessFactors(workbook);
    } else if (type === 'grc') {
        return parseGRCData(workbook);
    } else if (type === 'ad') {
        return parseADData(workbook);
    }
}
```

### Live Modus Implementatie

```javascript
// Live API connectors
const LiveConnectors = {
    async fetchSuccessFactors() {
        const response = await fetch('/api/sf/employees');
        return response.json();
    },

    async fetchGRCRoles() {
        const response = await fetch('/api/grc/roles');
        return response.json();
    },

    async fetchADGroups() {
        const response = await fetch('/api/ad/groups');
        return response.json();
    }
};
```

### Machine Learning Enhancement

Toekomstige verbeteringen:
- ML-based role clustering
- Anomalie detectie in access patterns
- Predictive analytics voor nieuwe functies
- Automatische risk scoring

## Best Practices

### Saturatie Threshold

- **80%** is de aanbevolen standaard
- Te laag (bijv. 50%): Te veel users krijgen rollen die ze niet nodig hebben
- Te hoog (bijv. 95%): Weinig opportunities, blijft veel handmatig werk

### Validatie Proces

1. Review saturatie percentages
2. Controleer impact (aantal betrokken users)
3. Overweeg business context
4. Keur goed of keur af met reden

### Reprovisioning

- Test eerst in development omgeving
- Plan reprovisioning buiten kantooruren
- Communiceer vooraf met betrokken medewerkers
- Monitor systemen na provisioning

## Support & Feedback

Voor vragen of suggesties, neem contact op met het development team.

## Licentie

Proprietary - Vitens N.V.
