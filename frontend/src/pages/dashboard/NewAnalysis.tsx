import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Link as LinkIcon,
  MessageSquare,
  ShoppingCart,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  Loader2,
  ArrowRight,
  RotateCcw,
  ExternalLink,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { analysisService } from '../../services/analysisService'
import { RiskBadge } from '../../components/risk/RiskBadge'
import type { ScanType, TransactionQuestionnaireData, ScanJob } from '../../types/analysis'

export const NewAnalysis: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Selected Tab (default to 'message' as SMS/WhatsApp is the primary Cameroonian attack vector)
  const [activeTab, setActiveTab] = useState<ScanType>('message')

  // URL Form States
  const [urlInput, setUrlInput] = useState('')
  const [urlPlatform, setUrlPlatform] = useState<'whatsapp' | 'facebook' | 'sms' | 'other'>('whatsapp')

  // Message Form States
  const [messageInput, setMessageInput] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [messagePlatform, setMessagePlatform] = useState<'whatsapp' | 'facebook' | 'sms' | 'other'>('sms')

  // Transaction Questionnaire States
  const [productDesc, setProductDesc] = useState('')
  const [amountFCFA, setAmountFCFA] = useState('')
  const [qData, setQData] = useState<TransactionQuestionnaireData>({
    verificationPossible: 'not_yet',
    fullAdvancePayment: 'partial',
    urgencyOrSecrecy: 'no',
    officialChannelConfirmed: 'na',
    documentedConditions: 'partially',
    saferOptionExists: 'yes',
  })

  // Mandatory Consent Checkbox
  const [consent, setConsent] = useState(false)

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [completedScan, setCompletedScan] = useState<ScanJob | null>(null)

  const handleTabChange = (type: ScanType) => {
    setActiveTab(type)
    setValidationError(null)
    setCompletedScan(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    if (!consent) {
      setValidationError(t('dashboard.newAnalysis.fields.consentRequired'))
      return
    }

    let contentToAnalyze = ''

    if (activeTab === 'url') {
      const trimmed = urlInput.trim()
      if (!trimmed || (!trimmed.startsWith('http://') && !trimmed.startsWith('https://'))) {
        setValidationError(t('dashboard.newAnalysis.errors.urlRequired', 'Veuillez saisir une URL valide commençant par http:// ou https://'))
        return
      }
      contentToAnalyze = trimmed
    } else if (activeTab === 'message') {
      const trimmed = messageInput.trim()
      if (trimmed.length < 10) {
        setValidationError(t('dashboard.newAnalysis.errors.messageRequired', 'Le message doit contenir au moins 10 caractères pour être analysé.'))
        return
      }
      contentToAnalyze = trimmed
    } else if (activeTab === 'transaction') {
      const desc = productDesc.trim() || 'Transaction informelle en ligne'
      contentToAnalyze = `${desc} (${amountFCFA ? amountFCFA + ' FCFA' : 'Montant non spécifié'})`
    }

    setIsSubmitting(true)

    try {
      const result = await analysisService.createAnalysis({
        type: activeTab,
        content: contentToAnalyze,
        consent,
        context: {
          platform: activeTab === 'url' ? urlPlatform : messagePlatform,
          senderPhone: senderPhone.trim() || undefined,
          claimedAmount: amountFCFA ? Number(amountFCFA) : undefined,
          questionnaire: activeTab === 'transaction' ? qData : undefined,
        },
      })

      setCompletedScan(result)
    } catch (err: any) {
      setValidationError(err.message || 'Une erreur est survenue lors de l\'évaluation.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setUrlInput('')
    setMessageInput('')
    setSenderPhone('')
    setProductDesc('')
    setAmountFCFA('')
    setConsent(false)
    setValidationError(null)
    setCompletedScan(null)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] tracking-tight">
          {t('dashboard.newAnalysis.title', 'Lancer une nouvelle analyse')}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          {t(
            'dashboard.newAnalysis.subtitle',
            'Évaluez un lien suspect, un SMS / message WhatsApp ou lancez le questionnaire de transaction.'
          )}
        </p>
      </div>

      {/* RESULT VIEW (If analysis is completed) */}
      {completedScan ? (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-soft-sm space-y-6 animate-in fade-in-50 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)]">
                Résultat de l'analyse immédiate
              </span>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Évaluation KmerShield terminée
              </h2>
            </div>
            {completedScan.riskLevel && (
              <RiskBadge level={completedScan.riskLevel} size="lg" />
            )}
          </div>

          {/* Evaluated Target */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] space-y-1">
            <p className="text-xs font-semibold text-[var(--text-muted)]">Ressource analysée :</p>
            <p className="text-xs sm:text-sm font-mono text-[var(--text-main)] break-all font-medium">
              {completedScan.target}
            </p>
          </div>

          {/* Recommendation Box */}
          {completedScan.recommendation && (
            <div
              className="p-4 rounded-xl border flex items-start gap-3"
              style={{
                backgroundColor:
                  completedScan.riskLevel === 'high'
                    ? 'var(--risk-danger-soft)'
                    : completedScan.riskLevel === 'moderate'
                    ? 'var(--risk-warning-soft)'
                    : 'var(--risk-success-soft)',
                borderColor:
                  completedScan.riskLevel === 'high'
                    ? 'var(--risk-danger)'
                    : completedScan.riskLevel === 'moderate'
                    ? 'var(--risk-warning)'
                    : 'var(--risk-success)',
              }}
            >
              {completedScan.riskLevel === 'high' ? (
                <ShieldAlert className="w-5 h-5 shrink-0 text-[var(--risk-danger)] mt-0.5" />
              ) : completedScan.riskLevel === 'moderate' ? (
                <AlertTriangle className="w-5 h-5 shrink-0 text-[var(--risk-warning)] mt-0.5" />
              ) : (
                <ShieldCheck className="w-5 h-5 shrink-0 text-[var(--risk-success)] mt-0.5" />
              )}
              <div className="text-xs sm:text-sm space-y-0.5">
                <span className="font-bold text-[var(--text-main)]">Recommandation KmerShield :</span>
                <p className="text-[var(--text-main)] leading-relaxed">
                  {completedScan.recommendation}
                </p>
              </div>
            </div>
          )}

          {/* Detected Findings List */}
          {completedScan.findings && completedScan.findings.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Signaux et indices observés ({completedScan.findings.length})
              </h3>
              <div className="space-y-2">
                {completedScan.findings.map((fnd) => (
                  <div
                    key={fnd.id}
                    className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-start gap-3"
                  >
                    <RiskBadge level={fnd.severity} size="sm" showIcon={false} />
                    <div className="space-y-0.5 text-xs">
                      <p className="font-semibold text-[var(--text-main)]">{fnd.title}</p>
                      <p className="text-[var(--text-muted)] leading-relaxed">{fnd.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-surface-secondary)] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Lancer une autre analyse</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/dashboard/analyses/${completedScan.id}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <span>Consulter le rapport complet</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* FORM VIEW */
        <div className="space-y-6">
          {/* Tabs Selector */}
          <div
            role="tablist"
            aria-label="Types d'analyse"
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[var(--bg-surface-secondary)] p-1.5 rounded-2xl border border-[var(--border-color)]"
          >
            {/* Tab 1: Message / SMS */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'message'}
              onClick={() => handleTabChange('message')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'message'
                  ? 'bg-[var(--bg-surface)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{t('dashboard.newAnalysis.tabs.message', 'SMS / Message WhatsApp')}</span>
            </button>

            {/* Tab 2: URL */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'url'}
              onClick={() => handleTabChange('url')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-[var(--bg-surface)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <LinkIcon className="w-4 h-4 shrink-0" />
              <span>{t('dashboard.newAnalysis.tabs.url', 'Lien suspect (URL)')}</span>
            </button>

            {/* Tab 3: Transaction Questionnaire */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'transaction'}
              onClick={() => handleTabChange('transaction')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'transaction'
                  ? 'bg-[var(--bg-surface)] text-[var(--primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>{t('dashboard.newAnalysis.tabs.transaction', 'Transaction en ligne')}</span>
            </button>
          </div>

          {/* Security Notice Card per Tab */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 flex items-start gap-3 shadow-2xs">
            <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-[var(--text-main)]">
                {activeTab === 'message' && t('dashboard.newAnalysis.securityNotice.messageTitle')}
                {activeTab === 'url' && t('dashboard.newAnalysis.securityNotice.urlTitle')}
                {activeTab === 'transaction' && t('dashboard.newAnalysis.securityNotice.transactionTitle')}
              </span>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {activeTab === 'message' && t('dashboard.newAnalysis.securityNotice.messageDesc')}
                {activeTab === 'url' && t('dashboard.newAnalysis.securityNotice.urlDesc')}
                {activeTab === 'transaction' && t('dashboard.newAnalysis.securityNotice.transactionDesc')}
              </p>
            </div>
          </div>

          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-soft-sm space-y-6"
          >
            {/* Validation Error Banner */}
            {validationError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl border flex items-start gap-2.5 text-xs text-[var(--feedback-error)]"
                style={{
                  backgroundColor: 'var(--feedback-error-soft)',
                  borderColor: 'var(--feedback-error)',
                }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-semibold">{validationError}</span>
              </div>
            )}

            {/* TAB 1: URL FIELDS */}
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="url-input"
                    className="block text-xs font-bold text-[var(--text-main)] mb-1.5"
                  >
                    {t('dashboard.newAnalysis.fields.urlLabel', 'Lien ou URL suspecte à analyser')}
                  </label>
                  <input
                    id="url-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t(
                      'dashboard.newAnalysis.fields.urlPlaceholder',
                      'https://orange-money-recharge-cm.free.nf/auth'
                    )}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {t('dashboard.newAnalysis.fields.urlHelper')}
                  </p>
                  {urlInput.length > 25 && !urlInput.includes('http') && !urlInput.includes('.') && (
                    <button
                      type="button"
                      onClick={() => {
                        setMessageInput(urlInput)
                        setUrlInput('')
                        handleTabChange('message')
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline mt-2 cursor-pointer"
                    >
                      <span>💡 Ceci ressemble à un message texte. Cliquez ici pour basculer sur l'analyseur de SMS</span>
                    </button>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="url-platform"
                    className="block text-xs font-bold text-[var(--text-main)] mb-1.5"
                  >
                    Où avez-vous reçu ce lien ? (facultatif)
                  </label>
                  <select
                    id="url-platform"
                    value={urlPlatform}
                    onChange={(e) => setUrlPlatform(e.target.value as any)}
                    className="w-full sm:w-64 px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                  >
                    <option value="whatsapp">Reçu sur WhatsApp</option>
                    <option value="sms">Reçu par SMS (Opérateur)</option>
                    <option value="facebook">Vu sur Facebook / Messenger</option>
                    <option value="other">Autre / Email</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 2: MESSAGE FIELDS */}
            {activeTab === 'message' && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="message-input"
                    className="block text-xs font-bold text-[var(--text-main)] mb-1.5"
                  >
                    {t('dashboard.newAnalysis.fields.messageLabel', 'Texte intégral du message ou SMS')}
                  </label>
                  <textarea
                    id="message-input"
                    required
                    rows={4}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={t(
                      'dashboard.newAnalysis.fields.messagePlaceholder',
                      'Collez ici le message reçu...'
                    )}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all leading-relaxed"
                  />
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {t('dashboard.newAnalysis.fields.messageHelper')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="sender-phone"
                      className="block text-xs font-bold text-[var(--text-main)] mb-1.5"
                    >
                      {t('dashboard.newAnalysis.fields.senderPhoneLabel', 'Expéditeur déclaré (facultatif)')}
                    </label>
                    <input
                      id="sender-phone"
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder={t('dashboard.newAnalysis.fields.senderPhonePlaceholder', 'Ex. 670 12 34 56')}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message-platform"
                      className="block text-xs font-bold text-[var(--text-main)] mb-1.5"
                    >
                      {t('dashboard.newAnalysis.fields.platformLabel', 'Canal de réception')}
                    </label>
                    <select
                      id="message-platform"
                      value={messagePlatform}
                      onChange={(e) => setMessagePlatform(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                    >
                      <option value="sms">SMS Mobile</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="facebook">Facebook / Marketplace</option>
                      <option value="other">Autre canal</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TRANSACTION QUESTIONNAIRE */}
            {activeTab === 'transaction' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--bg-surface-secondary)]/60 border border-[var(--border-subtle)]">
                  <div>
                    <label
                      htmlFor="product-desc"
                      className="block text-xs font-bold text-[var(--text-main)] mb-1"
                    >
                      Produit ou service concerné
                    </label>
                    <input
                      id="product-desc"
                      type="text"
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      placeholder="Ex. iPhone 13 128 Go ou Ordinateur portable"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="amount-fcfa"
                      className="block text-xs font-bold text-[var(--text-main)] mb-1"
                    >
                      Montant annoncé (en FCFA)
                    </label>
                    <input
                      id="amount-fcfa"
                      type="number"
                      value={amountFCFA}
                      onChange={(e) => setAmountFCFA(e.target.value)}
                      placeholder="Ex. 185000"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)]"
                    />
                  </div>
                </div>

                {/* 6 Neutral Questions from Project Proposal */}
                <div className="space-y-4">
                  {/* Q1 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q1')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q1Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'yes', label: t('dashboard.newAnalysis.questionnaire.options.yes') },
                        { val: 'no', label: t('dashboard.newAnalysis.questionnaire.options.no') },
                        { val: 'not_yet', label: t('dashboard.newAnalysis.questionnaire.options.not_yet') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q1"
                            value={opt.val}
                            checked={qData.verificationPossible === opt.val}
                            onChange={() => setQData({ ...qData, verificationPossible: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q2')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q2Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'yes', label: t('dashboard.newAnalysis.questionnaire.options.yes') },
                        { val: 'no', label: t('dashboard.newAnalysis.questionnaire.options.no') },
                        { val: 'partial', label: t('dashboard.newAnalysis.questionnaire.options.partial') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q2"
                            value={opt.val}
                            checked={qData.fullAdvancePayment === opt.val}
                            onChange={() => setQData({ ...qData, fullAdvancePayment: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q3')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q3Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'yes', label: t('dashboard.newAnalysis.questionnaire.options.yes') },
                        { val: 'no', label: t('dashboard.newAnalysis.questionnaire.options.no') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q3"
                            value={opt.val}
                            checked={qData.urgencyOrSecrecy === opt.val}
                            onChange={() => setQData({ ...qData, urgencyOrSecrecy: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q4 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q4')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q4Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'confirmed', label: t('dashboard.newAnalysis.questionnaire.options.confirmed') },
                        { val: 'unconfirmed', label: t('dashboard.newAnalysis.questionnaire.options.unconfirmed') },
                        { val: 'na', label: t('dashboard.newAnalysis.questionnaire.options.na') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q4"
                            value={opt.val}
                            checked={qData.officialChannelConfirmed === opt.val}
                            onChange={() => setQData({ ...qData, officialChannelConfirmed: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q5 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q5')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q5Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'yes', label: t('dashboard.newAnalysis.questionnaire.options.yes') },
                        { val: 'no', label: t('dashboard.newAnalysis.questionnaire.options.no') },
                        { val: 'partially', label: t('dashboard.newAnalysis.questionnaire.options.partially') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q5"
                            value={opt.val}
                            checked={qData.documentedConditions === opt.val}
                            onChange={() => setQData({ ...qData, documentedConditions: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q6 */}
                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] space-y-2">
                    <p className="text-xs font-bold text-[var(--text-main)]">
                      {t('dashboard.newAnalysis.questionnaire.q6')}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {t('dashboard.newAnalysis.questionnaire.q6Hint')}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      {[
                        { val: 'yes', label: t('dashboard.newAnalysis.questionnaire.options.yes') },
                        { val: 'no', label: t('dashboard.newAnalysis.questionnaire.options.no') },
                        { val: 'unknown', label: t('dashboard.newAnalysis.questionnaire.options.unknown') },
                      ].map((opt) => (
                        <label key={opt.val} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="q6"
                            value={opt.val}
                            checked={qData.saferOptionExists === opt.val}
                            onChange={() => setQData({ ...qData, saferOptionExists: opt.val as any })}
                            className="text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY CONSENT CHECKBOX */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[var(--primary)] border-[var(--border-color)] focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
                />
                <span className="text-xs text-[var(--text-main)] leading-relaxed group-hover:text-[var(--text-main)]">
                  {t('dashboard.newAnalysis.fields.consentCheckbox')}
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!consent || isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('dashboard.newAnalysis.submittingBtn')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('dashboard.newAnalysis.submitBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
